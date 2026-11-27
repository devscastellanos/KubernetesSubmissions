const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "files");
const filePath = path.join(dir, "log.txt");

const randomString = crypto.randomUUID();
fs.mkdirSync(dir, { recursive: true });

const writeLine = () => {
  const line = `${new Date().toISOString()}: ${randomString}\n`;
  fs.appendFileSync(filePath, line);
  process.stdout.write(line);
};

writeLine();
setInterval(writeLine, 5000);
