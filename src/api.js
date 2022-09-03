const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const router = express.Router();

// Applying middlewares to app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.json({
    message: "Success"
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
// =================================================











router.get("/health", (req, res) => {
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
