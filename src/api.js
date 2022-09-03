const express = require("express");
const cors = require("cors");
require("dotEnv").config();
const app = express();
const bodyParser = require("body-parser");
const serverless = require('serverless-http');
const router = express.Router();
const fs = require("fs");

// Applying middlewares to app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8000;

router.get("/", (req, res) => {
  res.status(200).json("Welcome! This route is working");
})

router.get("/instructions-module/:module", async (req, res) => {
  const { module } = req.params;
  console.log(__dirname);
  fs.readFile(`src/instructionsModule/${module}.md`, (e, data) => {
    if (e) {
      if (e.message?.includes("no such file or directory")) {
        res.status(404).json({ message: e.message });
        return;
      }
      console.error(e);
      res.status(500).json({ error: e.message });
      return;
    }
    res.status(200).json(data.toString());
  });
});

app.use('/.netlify/functions/api',router);
module.exports = app;
module.exports.handler = serverless(app)
