const crypto = require("crypto");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Se genera una sola vez al arrancar y queda en memoria
const randomString = crypto.randomUUID();

const getStatus = () => `${new Date().toISOString()}: ${randomString}`;

// Sigue imprimiendo en los logs cada 5 segundos
console.log(getStatus());
setInterval(() => console.log(getStatus()), 5000);

// Endpoint con el estado actual
app.get("/", (req, res) => {
  res.send(getStatus());
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
