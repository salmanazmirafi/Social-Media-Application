import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { register } from "./contraolar/auth.js";

/* Config app */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** File Storage **/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// -----------Routes file----------------///
app.post("/auth/register", upload.single("picture"), register);
// ---------------------------///

mongoose.connect(process.env.DATABASE_URI, () => {
  console.log("Database Connect 🙂");
});

const PROT = process.env.PROT || 5000;
app.listen(PROT, () => console.log(`Server running on port ${PROT} 🔥`));
