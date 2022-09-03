const express = require("express");
const cors = require("cors");
require("dotEnv").config();
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

// Applying middlewares to app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).json("Welcome! This route is working");
})

app.get("/instructions-module/:module", async (req, res) => {
  const { module } = req.params;
  fs.readFile(__dirname + `/instructionsModule/${module}.md`, (e, data) => {
    if (e) {
      if (e.message?.includes("no such file or directory")) {
        res.status(404).json({ message: "Module not found" });
        return;
      }
      res.status(500).json({ error: e.message });
      return;
    }
    res.status(200).json(data.toString());
  });
});

// Running server on port 8000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
