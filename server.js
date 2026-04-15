const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// Sample menu data (sama dengan frontend tapi dengan property 'image')
const menuItems = [
    {
        id: 1,
        name: 'Risol Mayo',
        description: 'Dengan isian mayo, telur dan beef.',
        price: 2500,
        image:'https://image2url.com/images/1764984757600-1a37d680-512a-4f54-a7f7-4131f9adf66e.jpg'
    },
    {   id: 2,
        name: 'Risol Cokelat Crunchy',
        description: 'Dengan isian cokelat crunchy yang manis dan lumer.',
        price: 2500,
        image: 'https://image2url.com/images/1764988650580-d48ee439-9adc-4c12-a399-a3dd7f10847e.jpg'
    },
    {
        id: 3,
        name: 'Risol Ayam Suwir',
        description: 'Dengan isian ayam suwir yang berbumbu.',
        price: 3000,
        image: 'https://image2url.com/images/1764985106802-6f144523-c936-48c3-a00f-3f7796f29dc2.jpg'
    },
    {
        id: 4,
        name: 'Risol Mentai Crabstick',
        description: 'Dengan isian saus mentai, telur dan crabstick.',
        price: 3000,
        image: 'https://image2url.com/images/1764988620764-4b96aaec-441a-4e82-a20e-2a443c51304a.jpg'
    },
    {
        id: 5,
        name: 'Risol Pizza Bolognese',
        description: 'Dengan isian sosis yang dicampur saus bolognese.',
        price: 3000,
        image: 'https://image2url.com/images/1764988585611-3f764de3-8d28-4bad-afa7-14e348649b24.jpg'
    },
    {
        id: 6,
        name: 'Udang Keju',
        description: 'Olahan udang dan daging ayam yang berisi keju lumer.',
        price: 3000,
        image: 'https://image2url.com/r2/default/images/1769564201605-92bf535c-3cd1-44d6-ac05-e447b082e3f3.jpg'
    },
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