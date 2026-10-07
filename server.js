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
        description: 'Dengan isian mayo, telur dan sosis.',
        price: 2500,
        image:'https://www.image2url.com/r2/default/images/1777513734728-b9bfff3a-e212-4a96-a488-eea27299993c.jpg'
    },
    {   id: 2,
        name: 'Risol Cokelat Crunchy',
        description: 'Dengan isian cokelat crunchy yang manis dan lumer.',
        price: 2500,
        image: 'https://www.image2url.com/r2/default/images/1791338283622-a8415044-5687-4a02-b63d-96f83a6a0668.jpg'
    },
    {
        id: 3,
        name: 'Risol Ayam Suwir',
        description: 'Dengan isian ayam suwir yang berbumbu.',
        price: 3000,
        image: 'https://www.image2url.com/r2/default/images/1791338702321-163874d0-19c9-481e-aacb-f16a89faab5a.jpg'
    },
    {
        id: 4,
        name: 'Risol Mentai Crabstick',
        description: 'Dengan isian saus mentai, telur dan crabstick.',
        price: 3000,
        image: 'https://www.image2url.com/r2/default/images/1791337460274-9ef9e35a-6115-493d-b9d5-de60522d748e.jpg'
    },
    {
        id: 5,
        name: 'Risol Pizza Bolognese',
        description: 'Dengan isian sosis yang dicampur saus bolognese.',
        price: 3000,
        image: 'https://www.image2url.com/r2/default/images/1791338392647-a57ef3d7-21dd-444f-8efd-85ab3cb4dab6.jpg'
    },
    {
        id: 6,
        name: 'Risol Matcha Keju',
        description: 'Dengan isian fla matcha dan keju yang lumer.',
        price: 3000,
        image: 'https://www.image2url.com/r2/default/images/1777513626075-22d228f0-2f24-4efb-afc0-584e764c8a65.jpg'
    },
    {
        id: 7,
        name: 'Udang Keju',
        description: 'Olahan udang dan daging ayam yang berisi keju lumer.',
        price: 3000,
        image: 'https://www.image2url.com/r2/default/images/1791338583707-662999dc-db06-423c-b1b4-d9e7edd09d0e.jpg'
    },
    {
        id: 8,
        name: 'Bola Ayam Keju',
        description: 'Olahan daging ayam yang berisi keju lumer.',
        price: 2500,
        image: 'https://www.image2url.com/r2/default/images/1791338163000-54211bf3-d77c-49fa-be62-c3bdc0da46c7.jpg'
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