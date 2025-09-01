import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const USUARIOS_FILE = path.join(__dirname, '..', 'data', 'usuarios.txt');
const PONTOS_FILE = path.join(__dirname, '..', 'data', 'pontos.txt');

// Login
app.post('/login', (req: Request, res: Response) => {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) return res.status(400).json({ erro: 'Campos faltando' });

    const usuarios = fs.readFileSync(USUARIOS_FILE, 'utf-8').split('\n');
    const userFound = usuarios.find(u => u.trim() === `${usuario}:${senha}`);

    if (userFound) return res.json({ sucesso: true, usuario });
    return res.status(401).json({ erro: 'Usuário ou senha inválidos' });
});

// Registrar ponto
app.post('/registrar-ponto', (req: Request, res: Response) => {
    const { usuario } = req.body;
    if (!usuario) return res.status(400).json({ erro: 'Usuário faltando' });

    const agora = new Date();
    const data = agora.toISOString().split('T')[0]; // yyyy-mm-dd
    const hora = agora.toTimeString().split(' ')[0]; // HH:MM:SS

    const linha = `${usuario}|${data}|${hora}\n`;
    fs.appendFileSync(PONTOS_FILE, linha);

    res.json({ sucesso: true, data, hora });
});

// Buscar pontos
app.get('/pontos/:usuario', (req: Request, res: Response) => {
    const { usuario } = req.params;
    if (!usuario) return res.status(400).json({ erro: 'Usuário faltando' });

    if (!fs.existsSync(PONTOS_FILE)) return res.json([]);

    const pontos = fs.readFileSync(PONTOS_FILE, 'utf-8')
        .split('\n')
        .filter(linha => linha.startsWith(usuario))
        .map(linha => {
            const [user, data, hora] = linha.split('|');
            return { data, hora };
        });

    res.json(pontos);
});

app.listen(PORT, () => console.log(`Backend rodando em http://localhost:${PORT}`));
