const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const filePath = path.join(__dirname, "files", "pingpong.txt");

// Recupera el contador si ya existe en el volumen
let counter = 0;
try {
  counter = parseInt(fs.readFileSync(filePath, "utf8"), 10) || 0;
} catch {
  // el archivo aún no existe
}

app.get("/pingpong", (req, res) => {
  res.send(`pong ${counter}`);
  counter++;
  fs.writeFileSync(filePath, String(counter));
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
