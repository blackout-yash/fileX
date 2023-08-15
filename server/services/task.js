import fs, { promises as fsPromises, stat } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import path, { dirname } from "path";
import { File } from '../models/file.js';
import { connectDB } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directoryPath = `${__dirname}/../uploads`;

dotenv.config({
    path: '../.env'
});

connectDB("");

export const folderDel = async () => {
    try {
        const files = await fsPromises.readdir(directoryPath);

        for (const file of files) {
            const filePath = join(directoryPath, file);

            if (path.extname(filePath)) {
                fs.unlinkSync(filePath);
                console.log("Deleted from uploads");
            }
        }
    } catch (err) {
        console.log('Error in deleting temp downloaded file', err);
    }
}

export const fileDel = async () => {
    try {
        const pastDate = new Date(Date.now() - 24 * 60 * 60 * 100);
        const files = await File.find({ createdAt: { $lt: pastDate } });
        for (const file of files) {
            await file.remove();
            console.log("Deleted from DB");
        }
    } catch (error) {
        console.log('Error in deleting from db', err);
    }
}

fileDel()
    .then(() => {
        return folderDel();
    })
    .then(() => {
        return process.exit();
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });