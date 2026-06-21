// Platform Compliance Server Module
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Serve the frontend interface securely
app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

// Sanitized production port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Compliance framework running smoothly on port ${PORT}`);
});