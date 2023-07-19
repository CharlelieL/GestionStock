const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur Node.js!');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné !');
});