import express from "express";
import fs, { promises as fsPromises, stat } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import { File } from '../models/file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directoryPath = `${__dirname}/../uploads`;

const router = express.Router();

const folderDel = async (req, res, next) => {
    try {
        const files = await fsPromises.readdir(directoryPath);

        for (const file of files) {
            const filePath = join(directoryPath, file);

            if (path.extname(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Deleted from uploads");
            }
        }
        res.status(200).json({
            success: true,
            message: "Cron job successfully executed!"
        });
    } catch (err) {
        console.log('Error in deleting temp downloaded file', err);
        res.status(400).json({
            success: false,
            message: "Cron execution failed!"
        });
    }
}

const fileDel = async (req, res, next) => {
    try {
        const pastDate = new Date(Date.now() - 24 * 60 * 60 * 100);
        const files = await File.find({ createdAt: { $lt: pastDate } });
        for (const file of files) {
            await file.remove();
            console.log("Deleted from DB");
        }
        next();
    } catch (error) {
        console.log('Error in deleting from db', err);
        next();
    }
}

router.get("/cron", fileDel, folderDel);

export default router; 