'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require("fs");

// Applying middlewares to app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

// router.get('/', (req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   res.write('<h1>Hello from Express.js!</h1>');
//   res.end();
// });
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

router.get("/", (req, res) => {
  res.status(200).json("Welcome! This route is working");
})

router.get("/instructions-module/:module", async (req, res) => {
  const { module } = req.params;
  fs.readFile(path.join(__dirname, `../instructionsModule/${module}.md`), (e, data) => {
    if (e) {
      if (e.message?.includes("no such file or directory")) {
        console.error(e);
        res.status(404).json({ message: "Module not found"+e.message });
        return;
      }
      console.error(e);
      res.status(500).json({ error: e.message });
      return; 
    }
    res.status(200).json(data.toString());
  });
});

app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);


app.listen(8000, () => console.log("Server is running on port 8000"))





