import express from "express";
import { File } from "../models/file.js";

const router = express.Router();

router.get("/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Link has been expired."
            });
        }

        return res.status(200).json({
            // uuid: file.uuid,
            // fileName: file.fileName,
            // fileSize: file.size,
            // download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
            url: file.url
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
});

export default router; 