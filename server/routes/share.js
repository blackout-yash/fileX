import express from "express";
import { File } from "../models/file.js";

const router = express.Router();

router.get("/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.redirect(process.env.FRONTEND_URL);
        }
        res.redirect(file.url);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
});

export default router; 