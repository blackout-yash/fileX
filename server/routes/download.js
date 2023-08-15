import express from "express";
import { File } from "../models/file.js";
import { promises as fs } from "fs";

import { fileURLToPath } from 'url';
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const downloadFile = async (url, path) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(path, buffer);
}

const downloadUtil = async (req, res, next) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.redirect(process.env.FRONTEND_URL);
        }

        console.log(import.meta.url)
        console.log(__filename)
        console.log(__dirname)

        const dirPath = `${__dirname}/../uploads`;
        const fileName = `${req.params.uuid}`;
        const fileExtension = path.extname(file.path);
        const filePath = path.join(dirPath, fileName + fileExtension);

        const imageUrl = file.url;
        await downloadFile(imageUrl, filePath);

        res.download(filePath);
    } catch (error) {
        console.error(`${error.message}`);
    }
}

router.get('/:uuid', downloadUtil);

export default router; 