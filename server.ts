import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Proxy Gemini API route
  app.post('/api/ai/resume-improve', async (req, res) => {
    try {
      const { text, instruction } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API Key is not configured on the server.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `As an expert ATS resume reviewer and writer, please ${instruction} for the following text. Keep the output focused, professional, and action-oriented. Do not include markdown formatting like backticks for raw text unless requesting formatting. \n\nOriginal Text:\n${text}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ improvedText: response.text });
    } catch (error) {
      console.error('Error with Gemini API:', error);
      res.status(500).json({ error: 'Failed to process text with AI.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
