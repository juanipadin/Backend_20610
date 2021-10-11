const express = require('express')

const app = express()

app.set('view engine', 'ejs');

app.get("/datos", (req, res) => {
    res.render("pages/datos", {
        min: req.query.min,
        nivel: req.query.nivel,
        max: req.query.max,
        titulo: req.query.titulo,
    });});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));