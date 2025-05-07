const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_ID = process.env.BIN_ID;

router.post('/', async (req, res) => {
  const cardData = req.body;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify({ record: cardData }),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error en /api/cards:', error);
    res.status(500).json({ error: 'Error al guardar la tarjeta en JSONBin' });
  }
});

module.exports = router;