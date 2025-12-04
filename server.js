const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Пути к файлам данных
const DATA_DIR = path.join(__dirname, 'data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const RESERVATIONS_FILE = path.join(DATA_DIR, 'reservations.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletter.json');

// Функция инициализации данных
async function initializeData() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }

    const files = [
        { file: RESERVATIONS_FILE, default: [] },
        { file: NEWSLETTER_FILE, default: [] },
        { file: MENU_FILE, default: [
            {
                "id": 1,
                "name": "Хачапури по-аджарски",
                "description": "Лодочка из теста с сыром сулугуни и яйцом",
                "price": 450,
                "category": "bread"
            },
            // ... остальные блюда из вашего меню
        ]}
    ];

    for (const { file, default: defaultData } of files) {
        try {
            await fs.access(file);
        } catch {
            await fs.writeFile(file, JSON.stringify(defaultData, null, 2));
        }
    }
}

// Явно обрабатываем HTML страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/menu.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

// API Routes
app.get('/api/menu', async (req, res) => {
    try {
        const data = await fs.readFile(MENU_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
        res.status(500).json({ error: 'Ошибка загрузки меню' });
    }
});

app.post('/api/reservations', async (req, res) => {
    try {
        const reservation = {
            id: Date.now(),
            ...req.body,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        
        let reservations = [];
        try {
            const data = await fs.readFile(RESERVATIONS_FILE, 'utf8');
            reservations = JSON.parse(data);
        } catch (error) {}
        
        reservations.push(reservation);
        await fs.writeFile(RESERVATIONS_FILE, JSON.stringify(reservations, null, 2));
        
        res.status(201).json({ message: 'Бронь успешно создана', id: reservation.id });
    } catch (error) {
        console.error('Ошибка создания брони:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email обязателен' });
        }
        
        let subscribers = [];
        try {
            const data = await fs.readFile(NEWSLETTER_FILE, 'utf8');
            subscribers = JSON.parse(data);
        } catch (error) {}
        
        if (!subscribers.find(sub => sub.email === email)) {
            subscribers.push({
                email,
                subscribedAt: new Date().toISOString()
            });
            
            await fs.writeFile(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));
        }
        
        res.json({ message: 'Успешно подписан' });
    } catch (error) {
        console.error('Ошибка подписки:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, async () => {
    console.log('Инициализация данных...');
    await initializeData();
    console.log(`Сервер ресторана "Саперави" запущен на порту ${PORT}`);
    console.log(`Главная: http://localhost:${PORT}`);
    console.log(`О нас: http://localhost:${PORT}/about.html`);
    console.log(`Меню: http://localhost:${PORT}/menu.html`);
});