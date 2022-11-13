"use strict";
require("dotenv").config();
const express = require("express");
const path = require("path");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const greetingsController = require("./controllers/baseController");
const fetchStudentDataFromGoogleSheetController = require("./controllers/fetchStudentDataFromGoogleSheetController");

// Applying middlewares to app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const router = express.Router();

router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post("/", (req, res) => res.json({ postBody: req.body }));

router.get("/instructions-module/:module", async (req, res) => {
	try {
		const { module } = req.params;
		const filePath = path.resolve(`./public/${module}.md`);
		fs.readFile(filePath, function (e, data) {
			if (e) {
				console.error(e);
				if (e.message?.includes("no such file or directory")) {
					res.status(404).json({ message: "no such file or directory" });
					return;
				}
				console.error(e);
				res.status(500).json({ error: e.message });
				return;
			}
			res.status(200).json(data.toString());
		});
	} catch (e) {
		console.error(e);
		res.status(500).json({ error: e.message });
	}
});

router.get("/", greetingsController);
router.get("/student-data", fetchStudentDataFromGoogleSheetController);

app.use("/", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);

// app.listen(process.env.PORT, () => console.log(`Server is running on port ${PORT}`));
