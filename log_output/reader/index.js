const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, "files", "log.txt");

app.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(503).send("Log file not available yet");
    res.type("text/plain").send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
