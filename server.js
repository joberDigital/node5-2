require('dotenv').config();
const express = require('express');
const app = express();
const cardsRoute = require('./routes/cards');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api/cards', cardsRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});