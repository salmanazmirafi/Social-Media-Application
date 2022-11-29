const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const multer = require("multer");
const { fileURLToPath } = require("url");
/* Config app */
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
// ---------------------------///

// ---------------------------///

mongoose.connect(process.env.DATABASE_URI, () => {
  console.log("Database Connect 🙂");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥 🙂 `));
