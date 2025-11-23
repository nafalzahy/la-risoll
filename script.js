// Sample menu data
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
                <i class="${item.icon}"></i>
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
        message += `- ${item.name} - ${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}\n`;
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