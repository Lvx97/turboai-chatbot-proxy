import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Default AI backend (change if needed)
const TARGET_API = 'https://g4f.dev/api/completion';

app.use(cors());
app.use(express.json());

app.post('/api', async (req, res) => {
  try {
    const response = await fetch(TARGET_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`TurboAI Chatbot Proxy running on http://localhost:${PORT}`);
});
