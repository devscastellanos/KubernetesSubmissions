const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const dir = path.join(__dirname, "files");

const readFile = (name, fallback) => {
  try {
    return fs.readFileSync(path.join(dir, name), "utf8");
  } catch {
    return fallback;
  }
};

app.get("/", (req, res) => {
  const logLines = readFile("log.txt", "").trim().split("\n");
  const lastLine = logLines[logLines.length - 1] || "No logs yet";
  const pongs = readFile("pingpong.txt", "0").trim();

  res.type("text/plain").send(`${lastLine}.\nPing / Pongs: ${pongs}`);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
