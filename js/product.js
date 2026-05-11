document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const productContent = document.getElementById('productContent');
    
    if (!productId || isNaN(productId)) {
        productContent.innerHTML = '<div class="error-message">Product not found</div>';
        return;
    }
    
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        productContent.innerHTML = '<div class="error-message">Product not found</div>';
        return;
    }
    
    document.title = `${product.name} - TechStore`;

    // Путь к карточке товара (навигация)
    renderBreadcrumbs(product);    
    
    // Основная информация о товаре
    renderProduct(product);
    
    // Товары из той же категории, что и основная карточка товара
    renderRecommendations(product.category, product.id);    
    
    // Галерея изображений
    setupGallery(product.gallery); 
    
    // Технические характеристики
    setupAccordion();   
    
    // Количество товаров (+ / -)
    setupQuantitySelector(); 
    
    // Добавление в корзину
    setupAddToCart(product);   
});

// ----- Отрисовка звёзд рейтинга -----
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += `
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="#fdc700" stroke-width="3" stroke-linejoin="round" fill="#fdc700">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
        `;
    }   
    
    if (halfStar) {
        starsHtml += `
            <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="3" style="clip-path: inset(0 50% 0 0);" stroke-linejoin="round" stroke="#fdc700" fill="#fdc700">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
        `;
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `
            <svg width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="#e5e7eb" stroke-linejoin="round" fill="#e5e7eb">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
        `;
    }
    return starsHtml;
}

// ----- Кнопка Add to Cart на карточках Related Products -----
// ИСПРАВЛЕНИЕ: функция была объявлена дважды (внутри DOMContentLoaded и снаружи).
// Оставлен один экземпляр — глобальная функция, доступная из onclick в HTML.
function handleRecommendationAdd(productId, btn) {
    event.stopPropagation();
    addToCart(productId);
    btn.textContent = 'Added to Cart';
    btn.style.backgroundColor = '#10b981';
}

// ----- Путь к карточке товара (навигация) -----
function renderBreadcrumbs(product) {
    const breadcrumbsHtml = `
        <div class="page__breadcrumbs">
            <a href="index.html" class="breadcrumb__link">Products</a>
            <span class="breadcrumb__separator">
                <svg width="7" height="10" viewBox="0 0 7 10" stroke="#717182" stroke-width="1.17" stroke-linecap="round" stroke-linejoin="round" fill="none">
                    <path d="M1 1L5 5L1 9"/>
                </svg>
            </span>
            <span class="breadcrumb__category">${product.category}</span>
            <span class="breadcrumb__separator">
                <svg width="7" height="10" viewBox="0 0 7 10" stroke="#717182" stroke-width="1.17" stroke-linecap="round" stroke-linejoin="round" fill="none">
                    <path d="M1 1L5 5L1 9"/>
                </svg>
            </span>
            <span class="breadcrumb__name-product">${product.name}</span>
        </div>
    `;
    const breadcrumbsContainer = document.getElementById('breadcrumbs');

    if (breadcrumbsContainer) {
        breadcrumbsContainer.innerHTML = breadcrumbsHtml;
    }
}

// ----- Основная информация о товаре -----
function renderProduct(product) {
    const stars = renderStars(product.rating);
    
    const html = `
        <div class="product__detail">
            <!-- ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ -->
            <div class="product__gallery">
                <!-- ГЛАВНАЯ ФОТОГРАФИЯ -->
                <div class="main-image__container">
                    <img class="main-image"
                        id="mainImage" 
                        src="${product.gallery[0]}" 
                        alt="${product.name}" 
                        >
                    
                    <!-- КНОПКИ НАВИГАЦИИ (ЕСЛИ БОЛЬШЕ 1 ФОТО) -->
                    ${product.gallery.length > 1 ? `
                        <button class="slider-prev">
                            <svg width="20" height="20" viewBox="0 0 20 20" stroke="#1e2939" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" fill="none">
                                <path d="M12 15L7 10L12 5"/>
                            </svg>
                        </button>
                        <button class="slider-next">
                            <svg width="20" height="20" viewBox="0 0 20 20" stroke="#1e2939" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" fill="none">
                                <path d="M8 15L13 10L8 5"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
                
                <!-- МИНИАТЮРНЫЕ ФОТКИ -->
                ${product.gallery.length > 1 ? `
                    <div class="product__mini-gallery">
                        ${product.gallery.map((img, idx) => `
                            <div class="mini-gallery ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                                <img src="${img}" alt="${product.name} - view ${idx + 1}">
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            
            <!-- ИНФОРМАЦИЯ О ТОВАРЕ -->
            <div class="product__info">
                <div class="product__title-rating">
                    <p class="product__title">${product.name}</p>
                
                    <!-- Блок рейтинга -->
                    <div class="product__rating">
                        <span class="rating__stars">${stars}</span>
                        <span class="rating__value">(${product.rating})</span>
                    </div>

                    <!-- КОЛИЧЕСТВО ОТЗЫВОВ -->
                    <div class="rating__count">Based on ${product.reviewCount} reviews</div>
                    
                    <!-- Блок цены -->
                    <div class="product__price">
                        <span class="price__current">$${product.price}</span>
                        <span class="price__shipping">Free shipping</span>
                    </div>
                </div>
                
                <!-- КЛЮЧЕВЫЕ ХАРАКТЕРИСТИКИ (Key Highlights) -->
                <div class="product__highlights">
                    <p class="product__highlights-title">Key Highlights</p>
                    <ul class="product__highlights-list">
                        ${product.keyHighlights.map(highlight => `
                            <li class="product__highlights-item">
                                <span class="highlight__marker"></span>
                                <strong class="highlight__label">${highlight.label}</strong>
                                <span class="highlight__value">${highlight.value}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <!-- ОПИСАНИЕ -->
                <div class="product__description">
                    <p class="product__description-title">Description</p>
                    <p class="product__description-text">${product.description}</p>
                </div>
                
                <!-- ДЕЙСТВИЯ: КОЛИЧЕСТВО И КНОПКА -->
                <div class="product__actions">
                    <div class="quantity__control">
                        <label>Quantity</label>
                        <div class="quantity__selector">
                            <button class="quantity__minus">-</button>
                            <input class="quantity__input" value="1" min="1" max="1000">
                            <button class="quantity__plus">+</button>
                        </div>
                    </div>
                </div>
                    
                <button class="product__button-add-to-cart" data-id="${product.id}">
                    <svg class="product__cart-icon" width="20" height="20" viewBox="0 0 20 20" stroke="#fff" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" fill="none">
                        <path d="M1.71 1.71H4.21L6.71 12.54H15.88L18.38 4.21H5.04"/>
                        <circle cx="6.67" cy="17.5" r="0.835"/>
                        <circle cx="15.83" cy="17.5" r="0.835"/>
                    </svg>
                    <span class="product__button-title">Add to Cart</span>
                </button>
                
                <!-- АККОРДЕОН С ТЕХНИЧЕСКИМИ ХАРАКТЕРИСТИКАМИ -->
                <div class="product__accordion">
                    <div class="product__accordion-header">
                        <span class="product__accordion-title">Technical Specifications</span>
                        <svg class="product__accordion-icon" width="16" height="16" viewBox="0 0 16 16" stroke="#717182" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" fill="none">
                            <path d="M4 6L8 10L12 6"/>
                        </svg>
                    </div>
                
                    <div class="product__accordion-content">
                        <table class="specs__table">
                            ${Object.entries(product.specifications).map(([key, value]) => `
                                <tr>
                                    <td class="specs__key"><strong>${key}</strong></td>
                                    <td class="specs__value">${value}</td>
                                </tr>
                            `).join('')}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('productContent').innerHTML = html;
}

// ----- Товары из той же категории -----
function renderRecommendations(category, currentProductId) {
    if (typeof products === 'undefined') return;

    const sameCategoryProducts = products.filter(p =>
        p.category === category && p.id !== currentProductId
    );

    if (sameCategoryProducts.length === 0) return;

    const recommendationsHtml = `
        <div class="product__recommendations">
            <p class="product__recommendations-title">Related Products</p>
            <div class="product__recommendations-grid">
                ${sameCategoryProducts.map(p => `
                    <div class="product__recommendation-card" onclick="location.href='product.html?id=${p.id}'">
                        <div class="product__recommendation-image">
                            <img src="${p.image}" alt="${p.name}">
                        </div>
                        <div class="product__recommendation-info">
                            <p class="recommendation__name">${p.name}</p>
                            <div class="recommendation__rating">
                                <span class="recommendation__stars">${renderStars(p.rating)}</span>
                                <span class="recommendation__value">(${p.rating})</span>
                            </div>                               
                            <div class="recommendation__price">
                                <span class="recommendation__current">$${p.price}</span>
                                <span class="recommendation__category">${p.category.toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const productContent = document.getElementById('productContent');
    if (productContent) {
        productContent.insertAdjacentHTML('beforeend', recommendationsHtml);
    }
}

// ----- Галерея изображений -----
function setupGallery(gallery) {
    if (!gallery || gallery.length === 0) return;
    
    setTimeout(() => {
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.querySelectorAll('.mini-gallery');
        const butprev = document.querySelector('.slider-prev');
        const butnext = document.querySelector('.slider-next');
        
        if (!mainImage) return;

        let currentIndex = 0;  

        function updateMainImage(index) {
            currentIndex = index;
            mainImage.src = gallery[currentIndex];

            thumbnails.forEach((thumbnail, idx) => {
                thumbnail.classList.toggle('active', idx === currentIndex);
            });
        }
        
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => updateMainImage(index));
        });
        
        if (butprev) {
            butprev.addEventListener('click', () => {
                const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
                updateMainImage(newIndex);
            });
        }

        if (butnext) {
            butnext.addEventListener('click', () => {
                const newIndex = (currentIndex + 1) % gallery.length;
                updateMainImage(newIndex);
            });
        }   
    }, 50);
}

// ----- Аккордеон технических характеристик -----
function setupAccordion() {
    const accordionHeader = document.querySelector('.product__accordion-header');
    const accordionContent = document.querySelector('.product__accordion-content');
    
    if (!accordionHeader || !accordionContent) return;

    accordionHeader.addEventListener('click', () => {
        accordionContent.classList.toggle('show');
        accordionHeader.classList.toggle('active');
    });
}

// ----- Счётчик количества товара -----
function setupQuantitySelector() {
    const butminus = document.querySelector('.quantity__minus');
    const butplus = document.querySelector('.quantity__plus');
    const quantityInput = document.querySelector('.quantity__input');
    
    if (!butminus || !butplus || !quantityInput) return;

    butminus.addEventListener('click', () => {
        const value = parseInt(quantityInput.value);
        if (value > 1) quantityInput.value = value - 1;
    });
    
    butplus.addEventListener('click', () => {
        const value = parseInt(quantityInput.value);
        if (value < 99) quantityInput.value = value + 1;
    });
}

// ----- Добавление в корзину -----
function setupAddToCart(product) {
    const addButton = document.querySelector('.product__button-add-to-cart');
    if (!addButton) return;

    function setInCartState() {
        addButton.style.backgroundColor = '#10b981';
        const titleEl = addButton.querySelector('.product__button-title');
        if (titleEl) titleEl.textContent = 'Added to Cart';
    }

    function resetCartState() {
        addButton.style.backgroundColor = '';
        const titleEl = addButton.querySelector('.product__button-title');
        if (titleEl) titleEl.textContent = 'Add to Cart';
    }

    // Если товар уже в корзине — показываем состояние сразу
    if (typeof cart !== 'undefined' && cart.some(item => item.id == product.id)) {
        setInCartState();
    }

    addButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const quantityInput = document.querySelector('.quantity__input');
        const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

        addToCart(product.id, quantity);
        setInCartState();

        setTimeout(() => resetCartState(), 2500);
    });
}