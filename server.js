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
        image: 'https://image2url.com/images/1765337820373-bccd63b6-0380-4c76-bb4d-55fb0ee12b76.jpg'
    },
    {
        id: 7,
        name: 'Roti Kukus Thailand selai buah',
        description: 'Varian selai buah dengan 4 pilihan rasa selai yaitu Stawberry, Nanas, Blueberry, Dan Melon.',
        price: 3000,
        image: 'https://image2url.com/images/1765337872240-5bfca5af-4ccd-433b-8032-5085285124de.jpg'
    },
    {
        id: 8,
        name: 'Roti Kukus Thailand Selai Manis',
        description: 'Varian selai manis dengan 7 pilihan rasa yaitu Cokelat, Susu, Vanilla, Tiramisu, Cappucino, Taro, Dan Greentea.',
        price: 3500,
        image: 'https://image2url.com/images/1765337953658-e34cc4dc-0e44-4ec7-acf7-9603ad7ecc8e.jpg'
    },
    {
        id: 9,
        name: 'Roti Kukus Thailand Topping Keju/Meses',
        description: 'Varian Keju/Meses dengan 4 pilihan rasa yaitu Cokelat Keju/Meses dan susu Keju/Meses.',
        price: 4500,
        image: 'https://image2url.com/images/1765338340615-49835227-d00c-4fd4-9ecb-10cf94e956f4.jpg'
    },
     {
        id: 10,
        name: 'Roti Kukus Thailand Selai Cokelat Topping',
        description: 'Varian selai Cokelat topping ada 4 pilihan topping yaitu Oreo, Chocochip, Crunchy, dan kacang.',
        price: 5000,
        image: 'https://image2url.com/images/1765338394170-b7bacd7b-3373-4415-90ff-ca07bfe20c9d.jpg'
    },
    {
        id: 11,
        name: 'Roti Kukus Thailand Selai Tiramisu Topping',
        description: 'Varian selai tiramisu topping ada 4 pilihan topping yaitu Oreo, Chocochip, Crunchy, dan kacang.',
        price: 5000,
        image: 'https://image2url.com/images/1765338436255-d2e8d71f-801d-4076-9b87-30b367f0d1bd.jpg'
    },
    {
        id: 12,
        name: 'Roti Kukus Thailand Gurih/Asin',
        description: 'Varian gurih dan asin ada 4 pilihan yaitu Sosis mayo, Sosis Keju, Bakso mayo, dan Abon.',
        price: 7000,
        image: 'https://image2url.com/images/1765338478383-725ec741-ed68-4805-b416-0e9ed58aaeb6.jpg'
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