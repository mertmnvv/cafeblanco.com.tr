// Mobil menü için burger menü ve günün kahvesi özelliği
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Overlay oluştur
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    // Menüyü aç/kapa
    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    function toggleMenu() {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Link animasyonları
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.3s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }

    function closeMenu() {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');

        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }

    // Menü linklerine tıklandığında menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ESC tuşuna basıldığında menüyü kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav-active')) {
            closeMenu();
        }
    });

    // Ekran boyutu değiştiğinde menüyü sıfırla
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Günün Kahvesi için veri
    const coffees = [
        { name: 'Filter Coffee', price: '80', description: 'Günün özel harmanı, dengeli ve yumuşak içimli' },
        { name: 'Americano', price: '90', description: 'Sıcak su ile inceltilmiş espresso' },
        { name: 'Latte', price: '100', description: 'Espresso ve kadifemsi süt köpüğü' },
        { name: 'Cappuccino', price: '100', description: 'Eşit oranda espresso, süt ve süt köpüğü' },
        { name: 'Mocha', price: '130', description: 'Espresso, sıcak çikolata ve süt köpüğü' },
        { name: 'Caramel Macchiato', price: '120', description: 'Vanilya şurubu, espresso ve karamel sos' },
        { name: 'Flat White', price: '110', description: 'Double espresso ve kadifemsi süt köpüğü' },
        { name: 'Honey Latte', price: '120', description: 'Bal aromalı espresso ve süt köpüğü' }
    ];

    // Günün kahvesi elementlerini seç
    const randomCoffeeBtn = document.querySelector('.random-coffee-btn');
    const coffeeName = document.querySelector('.coffee-name');
    const coffeePrice = document.querySelector('.coffee-price');
    const coffeeDescription = document.querySelector('.coffee-description');

    // Günün kahvesini göster
    function showRandomCoffee() {
        const randomCoffee = coffees[Math.floor(Math.random() * coffees.length)];
        
        // Fade out efekti
        coffeeName.style.opacity = '0';
        coffeePrice.style.opacity = '0';
        if (coffeeDescription) coffeeDescription.style.opacity = '0';

        setTimeout(() => {
            coffeeName.textContent = randomCoffee.name;
            coffeePrice.textContent = randomCoffee.price + '₺';
            if (coffeeDescription) {
                coffeeDescription.textContent = randomCoffee.description;
            }

            // Fade in efekti
            coffeeName.style.opacity = '1';
            coffeePrice.style.opacity = '1';
            if (coffeeDescription) coffeeDescription.style.opacity = '1';

            // Menüde ilgili kahveyi vurgula
            highlightCoffeeInMenu(randomCoffee.name);
        }, 300);
    }

    // Menüde seçilen kahveyi vurgula
    function highlightCoffeeInMenu(coffeeName) {
        // Önceki vurguları kaldır
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('highlighted');
        });

        // Yeni kahveyi vurgula
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent;
            if (itemName === coffeeName) {
                item.classList.add('highlighted');
                // Scroll to item
                item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Event listeners
    if (randomCoffeeBtn) {
        // Sayfa yüklendiğinde rastgele bir kahve göster
        showRandomCoffee();

        // Butona tıklandığında yeni kahve göster
        randomCoffeeBtn.addEventListener('click', () => {
            randomCoffeeBtn.classList.add('clicked');
            showRandomCoffee();
            setTimeout(() => {
                randomCoffeeBtn.classList.remove('clicked');
            }, 200);
        });
    }

    // Scroll down fonksiyonu
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            const featuresSection = document.querySelector('.features');
            featuresSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });

        // Scroll olduğunda scroll-down butonunu kontrol et
        window.addEventListener('scroll', () => {
            const heroSection = document.querySelector('.hero');
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (window.scrollY > heroBottom / 2) {
                scrollDown.style.opacity = '0';
                setTimeout(() => {
                    scrollDown.style.visibility = 'hidden';
                }, 300);
            } else {
                scrollDown.style.visibility = 'visible';
                setTimeout(() => {
                    scrollDown.style.opacity = '0.8';
                }, 10);
            }
        });
    }
}); 