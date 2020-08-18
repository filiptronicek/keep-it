console.log(`Using node.js version ${process.version}`);

const express = require("express");
const path = require("path");
const MongoClient = require('mongodb').MongoClient;

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + '/src'));
app.get("/", function(req, res) {
  console.log("Rendered /src/index.html");
  res.sendFile(path.join(__dirname + "/src/index.html"));
});
app.get("/i", function(req, res) {
  console.log("Rendered /src/showgal.html");
  res.sendFile(path.join(__dirname + "/src/showgallery.html"));
});

app.listen(port, function() {
  console.log("Server is running on port:", port);
});
