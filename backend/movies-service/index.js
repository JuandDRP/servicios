const express = require("express");
const app = express();

app.listen(3002, () => {
    console.log("Servidor corriendo en http://localhost:3002");
});

app.get("/", (req, res) => {
    res.send("¡Servidor en Node.js con Express!");
});