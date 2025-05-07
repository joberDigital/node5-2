const fs = require('fs');
const path = require('path');

const files = {
  'public/index.html': `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tarjetas</title>
  <style>
    body { font-family: Arial, sans-serif; }
    .card { border: 1px solid #ccc; padding: 20px; margin: 10px; border-radius: 5px; }
    h1, h2 { color: #333; }
    .details { margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Tarjetas</h1>
  <h2>Agregar Nueva Tarjeta</h2>
  <form id="card-form">
    <input type="text" name="title" placeholder="Título" required><br>
    <input type="text" name="owner" placeholder="Propietario" required><br>
    <button type="submit">Agregar Tarjeta</button>
  </form>
  <div id="response-message"></div>
  <script>
    document.getElementById('card-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = e.target.title.value.trim();
      const owner = e.target.owner.value.trim();
      const card =    { title: 'algo', owner: 'alguien' }
      const messageDiv = document.getElementById('response-message');
    console.log("card"+card)
      try {
        const response = await fetch('/api/cards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(card)
        });
        if (!response.ok) throw new Error('Error al guardar la tarjeta');
        const data = await response.json();
        messageDiv.textContent = '¡Tarjeta guardada con éxito!';
        e.target.reset();
        console.log(data);
      } catch (err) {
        console.error(err);
        messageDiv.textContent = 'Error al guardar la tarjeta.';
      }
    });
  </script>
</body>
</html>`,

  'routes/cards.js': `const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const API_KEY = process.env.JSONBIN_API_KEY;
const BIN_ID = process.env.BIN_ID;

router.post('/', async (req, res) => {
  const cardData = req.body;
  try {
    const response = await fetch(\`https://api.jsonbin.io/v3/b/\${BIN_ID}\`, {
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

module.exports = router;`,

  'server.js': `require('dotenv').config();
const express = require('express');
const app = express();
const cardsRoute = require('./routes/cards');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/api/cards', cardsRoute);

app.listen(PORT, () => {
  console.log(\`Servidor corriendo en http://localhost:\${PORT}\`);
});`,

  '.env.example': `JSONBIN_API_KEY=tu_api_key_aqui
BIN_ID=tu_bin_id_aqui
`,

  '.gitignore': `.env
node_modules
`,

  'package.json': `{
  "name": "jsonbin-api-app",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "node-fetch": "^2.6.9"
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, 'jsonbin-app', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

console.log('Proyecto creado en ./jsonbin-app 🎉');