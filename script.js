// Sample menu data dengan gambar URL
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
        image: 'https://image2url.com/r2/default/images/1769563497315-20c141a0-012b-4b62-a11b-f17544160e6c.jpg'
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
]

// Cart state
let cart = [];

// Initialize animated background
function initAnimatedBackground() {
    const canvas = document.getElementById('animatedBackground');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 150)}, 
                               ${Math.floor(Math.random() * 100 + 150)}, 
                               ${Math.floor(Math.random() * 100 + 200)}, 
                               ${Math.random() * 0.5 + 0.2})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections between particles
        ctx.strokeStyle = 'rgba(100, 150, 255, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Render menu items
function renderMenu() {
    const menuList = document.getElementById('menuList');
    
    menuList.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='data:image/jpeg;base64,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'">
            </div>
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                <i class="fas fa-plus"></i> Tambah
            </button>
        </div>
    `).join('');
}

// Cart functions
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartDisplay();
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
    }
    
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// WhatsApp Functions
function generateWhatsAppMessage() {
    if (cart.length === 0) return '';
    
    let message = `Halo! Saya ingin memesan:\n\n`;
    
    cart.forEach(item => {
        message += `✅ ${item.name} - ${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}\n`;
    });
    
    message += `\n────────────────────\n`;
    message += `*Total: Rp ${calculateTotal().toLocaleString('id-ID')}*\n\n`;
    message += `Terima kasih!`;
    
    return encodeURIComponent(message);
}

function openWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang kosong! Tambahkan item terlebih dahulu.');
        return;
    }
    
    // GANTI DENGAN NOMOR WHATSAPP ANDA (format: 6281234567890)
    const phoneNumber = '6281330878436'; 
    const message = generateWhatsAppMessage();
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Buka WhatsApp di tab baru
    window.open(whatsappURL, '_blank');
}

async function processPayment() {
    if (cart.length === 0) {
        alert('Keranjang kosong! Tambahkan item terlebih dahulu.');
        return;
    }
    
    // Tampilkan konfirmasi dengan opsi
    const userChoice = confirm(
        'Pilih metode:\n\nOK - Kirim pesan ke WhatsApp\nCancel - Simpan di sistem saja'
    );
    
    if (userChoice) {
        // User memilih WhatsApp
        openWhatsApp();
    } else {
        // Simpan ke sistem backend
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cart,
                    total: calculateTotal(),
                    timestamp: new Date().toISOString()
                }),
            });
            
            if (response.ok) {
                alert('Pesanan berhasil disimpan di sistem!');
                clearCart();
            } else {
                alert('Terjadi kesalahan saat menyimpan pesanan.');
            }
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Tidak dapat terhubung ke server.');
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    const clearCartBtn = document.getElementById('clearCart');
    const cartFooter = document.querySelector('.cart-footer');
    const emptyCart = document.querySelector('.empty-cart');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Keranjang kosong</p>
            </div>
        `;
        clearCartBtn.classList.add('hidden');
        cartFooter.classList.add('hidden');
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        clearCartBtn.classList.remove('hidden');
        cartFooter.classList.remove('hidden');
    }
    
    totalAmount.textContent = `Rp ${calculateTotal().toLocaleString('id-ID')}`;
}

// Initialize app
function initApp() {
    initAnimatedBackground();
    renderMenu();
    updateCartDisplay();
    
    // Event listeners
    document.getElementById('clearCart').addEventListener('click', clearCart);
    document.getElementById('processPayment').addEventListener('click', processPayment);
    document.getElementById('whatsappBtn').addEventListener('click', openWhatsApp);
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);