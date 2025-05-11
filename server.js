require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const cardsRoute = require('./routes/cards');

const allowedOrigins = [
  'http://localhost:3000',       
  'https://node5-2.onrender.com' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.static('public'));

// ✅ Routes
app.use('/api/cards', cardsRoute);

// ✅ Start server only once
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
