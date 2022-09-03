const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// Applying middlewares to app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.status(200).json("Welcome! This route is working");
})

app.get("/instructions-module/:module", async (req, res) => {
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

app.listen(8000, () => console.log("Server is running on port 8000"))





