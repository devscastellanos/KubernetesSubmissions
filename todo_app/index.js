const express = require("express");
const fs = require("fs");
const fsp = require("fs/promises");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const DIR = path.join(__dirname, "files");
const IMAGE = path.join(DIR, "image.jpg");
const META = path.join(DIR, "image-meta.json");
const MAX_AGE_MS = 10 * 60 * 1000; // 10 minutos

let fetching = null; // evita descargas duplicadas simultáneas

const readMeta = async () => {
  try {
    return JSON.parse(await fsp.readFile(META, "utf8"));
  } catch {
    return null;
  }
};

const fetchImage = () => {
  if (fetching) return fetching;
  fetching = (async () => {
    const res = await fetch("https://picsum.photos/1200");
    if (!res.ok) throw new Error(`Picsum responded ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());

    await fsp.mkdir(DIR, { recursive: true });
    // escribir en un temporal y renombrar: nunca se sirve una imagen a medias
    await fsp.writeFile(`${IMAGE}.tmp`, buffer);
    await fsp.rename(`${IMAGE}.tmp`, IMAGE);
    await fsp.writeFile(META, JSON.stringify({ fetchedAt: Date.now() }));
    console.log(`New image fetched at ${new Date().toISOString()}`);
  })().finally(() => {
    fetching = null;
  });
  return fetching;
};

app.use(express.static(path.join(__dirname, "public")));

app.get("/image", async (req, res) => {
  try {
    const meta = await readMeta();

    if (!meta || !fs.existsSync(IMAGE)) {
      await fetchImage(); // primera vez: hay que esperar la descarga
    } else if (Date.now() - meta.fetchedAt > MAX_AGE_MS) {
      // expiró: se sirve la vieja una vez más y se descarga la nueva en segundo plano
      fetchImage().catch((err) => console.error(err.message));
    }

    res.set("Cache-Control", "no-store");
    res.sendFile(IMAGE);
  } catch (err) {
    console.error(err.message);
    res.status(502).send("Could not get image");
  }
});

// Solo para pruebas: tumba el contenedor para comprobar que la imagen persiste
app.get("/shutdown", (req, res) => {
  res.send("Shutting down...");
  console.log("Shutdown requested");
  setTimeout(() => process.exit(1), 100);
});

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
