const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

let counter = 0; // en memoria: se reinicia si el pod se reinicia

app.get("/pingpong", (req, res) => {
  res.send(`pong ${counter}`);
  counter++;
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
