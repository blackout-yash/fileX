import path from "path";
import multer from "multer";
import express from "express";
import { v4 as uuid4 } from "uuid";
import filestack from "filestack-js";

import { File } from "../models/file.js";
import { email } from "../controllers/email.js";

const router = express.Router();

const storage = multer.diskStorage({
    // destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000 * 100 }
}).single("myfile");

const client = filestack.init('A3PBFUnkdQBS0UTFgSZYVz');

router.post("/", (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required."
                })
            };

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            };

            const result = await client.upload(req.file.path);

            if (result) {
                res.url = result.url
                const file = new File({
                    filename: req.file.filename,
                    uuid: uuid4(),
                    path: req.file.path,
                    size: req.file.size,
                    url: res.url
                });

                const response = await file.save();
                return res.status(200).json({
                    id: response.uuid
                    // file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
                });
            } else {
                throw new Error("Server Slow");
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Error"
        })
    }
});

router.post('/send', email);

export default router; 