import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import files from "./routes/files.js";
import show from "./routes/show.js";
import download from "./routes/download.js";
import share from "./routes/share.js";
import cron from "./routes/cron.js";

const app = express();
dotenv.config();

const corsOptions = {
    origin: process.env.FRONTEND_URL
}
app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.use("/api/files", files);
app.use("/files", show);
app.use("/files/download", download);
app.use("/share", share);
app.use("/api", cron);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));