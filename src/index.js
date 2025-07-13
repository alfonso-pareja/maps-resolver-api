// src/server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { extractCoordinatesFromURL } from './utils/extractCoordinates.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Health check
app.get('/', (req, res) => {
  res.json({ message: '🗺️ Coordenadas Resolver API activa' });
});

// Coordenadas endpoint
app.get('/resolve', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Falta el parámetro ?url=' });
  }

  try {
    const response = await fetch(url, { method: 'GET', redirect: 'follow' });
    const finalURL = response.url;
    const coords = extractCoordinatesFromURL(finalURL);

    if (!coords) {
      return res.status(404).json({ error: 'No se encontraron coordenadas válidas' });
    }

    return res.status(200).json(coords);
  } catch (error) {
    console.error('❌ Error al resolver URL:', error.message);
    return res.status(500).json({ error: 'Ocurrió un error procesando la URL' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API disponible en http://localhost:${PORT}`);
});
