// Фронтенд функциональность для ресторана

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка меню
    if (document.getElementById('menu-container')) {
        loadMenu();
        setupFilters();
    }
    
    // Обработка форм
    setupForms();
    
    // Плавная прокрутка
    setupSmoothScroll();
});

// Загрузка меню
async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        const menuData = await response.json();
        displayMenu(menuData);
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
        document.getElementById('menu-container').innerHTML = '<p>Ошибка загрузки меню. Пожалуйста, попробуйте позже.</p>';
    }
}

// Отображение меню
function displayMenu(menuData) {
    const container = document.getElementById('menu-container');
    let html = '';
    
    // Группировка по категориям
    const categories = {};
    menuData.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    // Создание HTML для каждой категории
    for (const [category, items] of Object.entries(categories)) {
        html += `
            <article class="menu-category" data-category="${category}">
                <h3>${getCategoryName(category)}</h3>
                ${items.map(item => `
                    <article class="menu-item">
                        <div class="menu-item-content">
                            <h4>${item.name}</h4>
                            <p>${item.description}</p>
                        </div>
                        <span>${item.price} руб.</span>
                    </article>
                `).join('')}
            </article>
        `;
    }
    
    container.innerHTML = html;
}

// Названия категорий
function getCategoryName(category) {
    const names = {
        'bread': 'Хлеб и выпечка',
        'appetizer': 'Закуски',
        'main': 'Основные блюда',
        'dessert': 'Десерты',
        'drinks': 'Напитки'
    };
    return names[category] || category;
}

// Фильтрация меню
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убрать активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавить активный класс к текущей кнопке
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterMenu(category);
        });
    });
}

function filterMenu(category) {
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(cat => {
        if (category === 'all' || cat.dataset.category === category) {
            cat.style.display = 'block';
        } else {
            cat.style.display = 'none';
        }
    });
}

// Обработка форм
function setupForms() {
    // Форма бронирования
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservation);
    }
    
    // Форма подписки
    const newsletterForms = document.querySelectorAll('#newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletter);
    });
}

// Обработка бронирования
async function handleReservation(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reservation = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        guests: formData.get('guests'),
        comments: formData.get('comments'),
        timestamp: new Date().toISOString()
    };
    
    try {
        const response = await fetch('/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservation)
        });
        
        if (response.ok) {
            alert('Стол успешно забронирован! Мы свяжемся с вами для подтверждения.');
            e.target.reset();
        } else {
            throw new Error('Ошибка бронирования');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при бронировании. Пожалуйста, попробуйте позже или позвоните нам.');
    }
}

// Обработка подписки на рассылку
async function handleNewsletter(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    try {
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        if (response.ok) {
            alert('Спасибо за подписку!');
            e.target.reset();
        } else {
            throw new Error('Ошибка подписки');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при подписке. Пожалуйста, попробуйте позже.');
    }
}

// Плавная прокрутка
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Управление модальными окнами
function showModal(message) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; text-align: center;">
            <p>${message}</p>
            <button onclick="this.closest('div').parentElement.remove()" style="margin-top: 15px; padding: 10px 20px; background: var(--color-primary); color: white; border: none; border-radius: 5px; cursor: pointer;">OK</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}