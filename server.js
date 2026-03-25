const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Chave de API Anthropic (definida no .env) ─────────────────────────────────
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Proxy da API Anthropic ────────────────────────────────────────────────────
app.post('/api/generate', async (req, res) => {
  const apiKey = ANTHROPIC_API_KEY;

  try {
    const { default: fetch } = await import('node-fetch');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: req.body.model || 'claude-sonnet-4-20250514',
        max_tokens: req.body.max_tokens || 4000,
        system: req.body.system || '',
        messages: req.body.messages
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      return res.status(response.status).json({ error: err.error?.message || 'Erro na API Anthropic' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Erro ao chamar API:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor: ' + err.message });
  }
});

// ── Rota padrão: serve o index.html ─────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n╔═══════════════════════════════════════╗`);
  console.log(`║   Agente Pedagógico SENAI              ║`);
  console.log(`║   Rodando em http://localhost:${PORT}     ║`);
  console.log(`╚═══════════════════════════════════════╝\n`);
  console.log('✅ API Anthropic configurada e pronta.\n');
});
