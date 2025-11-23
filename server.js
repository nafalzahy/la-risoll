const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Sample menu data (same as frontend)
const menuItems = [
        {
        id: 1,
        name: 'Risol Mayo',
        description: 'Dengan isian mayo, telur dan beef.',
        price: 2500,
        icon: 'fas fa-hotdog'
    },
    {
        id: 2,
        name: 'Risol Cokelat Crunchy',
        description: 'Dengan isian cokelat crunchy yang manis dan lumer.',
        price: 2500,
        icon: 'fas fa-hotdog'
    },
    {
        id: 3,
        name: 'Risol Ayam Suwir',
        description: 'Dengan isian ayam suwir yang berbumbu.',
        price: 3000,
        icon: 'fas fa-hotdog'
    },
    {
        id: 4,
        name: 'Risol Mentai Crabstick',
        description: 'Dengan isian saus mentai, telur dan crabstick.',
        price: 3000,
        icon: 'fas fa-hotdog'
    },
    {
        id: 5,
        name: 'Risol Pizza Bolognese',
        description: 'Dengan isian sosis yang dicampur saus bolognese.',
        price: 3000,
        icon: 'fas fa-hotdog'
    },
    {
        id: 6,
        name: 'Udang Keju',
        description: 'Olahan udang dan daging ayam yang berisi keju lumer.',
        price: 3000,
        icon: 'fas fa-hotdog'
    },
    {
        id: 7,
        name: 'Roti Kukus Thailand selai buah',
        description: 'Varian selai buah dengan 4 pilihan rasa selai yaitu Stawberry, Nanas, Blueberry, Dan Melon.',
        price: 3000,
        icon: 'fas fa-bread-slice'
    },
    {
        id: 8,
        name: 'Roti Kukus Thailand Selai Manis',
        description: 'Varian selai manis dengan 7 pilihan rasa yaitu Cokelat, Susu, Vanilla, Tiramisu, Cappucino, Taro, Dan Greentea.',
        price: 3500,
        icon: 'fas fa-bread-slice'
    },
    {
        id: 9,
        name: 'Roti Kukus Thailand Topping Keju/Meses',
        description: 'Varian Keju/Meses dengan 4 pilihan rasa yaitu Cokelat Keju/Meses dan susu Keju/Meses.',
        price: 4500,
        icon: 'fas fa-bread-slice'
    },
    {
        id: 10,
        name: 'Roti Kukus Thailand Selai Cokelat Topping',
        description: 'Varian selai Cokelat topping ada 4 pilihan topping yaitu Oreo, Chocochip, Crunchy, dan kacang.',
        price: 5000,
        icon: 'fas fa-bread-slice'
    },
    {
        id: 11,
        name: 'Roti Kukus Thailand Selai Tiramisu Topping',
        description: 'Varian selai tiramisu topping ada 4 pilihan topping yaitu Oreo, Chocochip, Crunchy, dan kacang.',
        price: 5000,
        icon: 'fas fa-bread-slice'
    },
    {
        id: 12,
        name: 'Roti Kukus Thailand Gurih/Asin',
        description: 'Varian gurih dan asin ada 4 pilihan yaitu Sosis mayo, Sosis Keju, Bakso mayo, dan Abon.',
        price: 7000,
        icon: 'fas fa-bread-slice'
    }
];

// In-memory storage for orders
let orders = [];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/menu', (req, res) => {
    res.json(menuItems);
});

app.post('/api/orders', (req, res) => {
    const { items, total, timestamp } = req.body;
    
    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'No items in order' });
    }
    
    const newOrder = {
        id: orders.length + 1,
        items,
        total,
        timestamp,
        status: 'completed'
    };
    
    orders.push(newOrder);
    
    console.log('New order received:', newOrder);
    
    res.status(201).json({ 
        message: 'Order processed successfully', 
        order: newOrder 
    });
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Frontend: http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/menu`);
});