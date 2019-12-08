console.log(`Using node.js version ${process.version}`);

var express = require("express");
var path = require("path");

var app = express();

var port = process.env.PORT;

app.use(express.static(__dirname + '/src'));
app.get("/", function(req, res) {
  console.log("Rendered /src/index.html");
  res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.listen(port, function() {
  console.log("Server is running on port:", port);
});
