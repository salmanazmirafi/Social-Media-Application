const express = require("express");
const mongoose = require("mongoose");

const app = express();

// ---------------------------///

// ---------------------------///

mongoose.connect(process.env.DATABASE_URI, () => {
  console.log("Database Connect");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
