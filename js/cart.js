let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();

    // Если корзина пуста - сбрасываем промокод
    if (cart.length === 0) {
        localStorage.removeItem('promoApplied');
        localStorage.removeItem('promoCode');
        localStorage.removeItem('promoError');
    }
}

// Обновление бейджа над корзиной
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

// ГЛАВНАЯ ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ
function addToCart(productId, quantity = 1) {
    if (typeof products === 'undefined') {
        return false;
    }

    const product = products.find(p => p.id == productId);
    if (!product) {
        return false;
    }

    const existingItem = cart.find(item => item.id == productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.images ? product.images[0] : product.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartBadge();
    return true;
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id != productId);
    saveCart();
    renderCart();
}

// Функция обновления количества
function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id == productId);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    item.quantity = newQuantity;
    saveCart();
    renderCart();
}

// Применение промокода
function applyPromo() {
    const input = document.getElementById('promoInput');
    const applyBtn = document.querySelector('.promo-apply-btn');

    if (!input) return;

    const code = input.value.trim();

    // Пустое поле — не реагируем
    if (code === '') return;

    if (code === 'SAVE10') {
        localStorage.setItem('promoApplied', 'true');
        localStorage.setItem('promoCode', code);
        localStorage.removeItem('promoError'); // сбрасываем ошибку

        if (applyBtn) applyBtn.disabled = true;

        renderCart();
    } else {
        localStorage.removeItem('promoApplied');
        localStorage.removeItem('promoCode');
        localStorage.setItem('promoError', 'true'); // запоминаем ошибку

        if (applyBtn) applyBtn.disabled = false;

        renderCart();
    }
}

// Функция Proceed to Checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Add some items before checkout.');
        return;
    }
    alert('Proceeding to checkout...');
}

// Отрисовка страницы корзины
function renderCart() {
    const cartContent = document.getElementById('cartContent');
    if (!cartContent) return;

    // Если корзина пуста - показываем Empty State
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty-container">
                <div class="cart-empty-wrapper">
                    <div class="cart-empty-title">Your Cart is Empty</div>
                    <div class="cart-empty-description">Add some amazing products to get started!</div>
                    <button class="cart-empty-continue-btn" onclick="window.location.href='index.html'">Continue Shopping</button>
                </div>
            </div>
        `;
        return;
    }

    // Если есть товары - отображаем их
    let itemsHtml = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        const isMinusDisabled = item.quantity === 1;

        itemsHtml += `
            <div class="cart__item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart__item-image">
                <div class="cart__item-info">
                    <div class="cart__item-header">
                        <div class="cart__item-left">
                            <div class="cart__item-title">${item.name}</div>
                            <div class="cart__item-subtitle">${item.category}</div>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#99A1AF" stroke-width="1.33" stroke-linejoin="round" stroke-linecap="round">
                                <rect x="5.33" y="1.33" width="5.34" height="2.67" rx="1.33"/>
                                <path d="M3.33 4 L4.33 14.67 C4.33 15.17 4.83 15.33 5.33 15.33 L10.67 15.33 C11.17 15.33 11.67 15.17 11.67 14.67 L12.67 4"/>
                                <line x1="6.67" y1="7.33" x2="6.67" y2="11.33"/>
                                <line x1="9.33" y1="7.33" x2="9.33" y2="11.33"/>
                                <line x1="2" y1="4" x2="14" y2="4"/>
                            </svg>
                        </button>
                    </div>
                    <div class="cart__item-footer">
                        <div class="cart__item-counter">
                            <button
                                class="counter-btn counter-minus"
                                onclick="updateQuantity(${item.id}, -1)"
                                ${isMinusDisabled ? 'disabled' : ''}
                            >−</button>
                            <span class="counter-value">${item.quantity}</span>
                            <button class="counter-btn counter-plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div class="cart__item-price-section">
                            <div class="cart__item-total-price">$${(item.price * item.quantity).toFixed(2)}</div>
                            <div class="cart__item-each-price">$${item.price.toFixed(2)} each</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    const taxRate = 0.08;

    let discount = 0;
    const isPromoApplied = localStorage.getItem('promoApplied') === 'true' &&
                        localStorage.getItem('promoCode') === 'SAVE10';
    const isPromoError   = localStorage.getItem('promoError') === 'true';

    if (isPromoApplied) {
        discount = subtotal * 0.1;
    }

    // Налог считается от суммы ПОСЛЕ скидки
    const tax = (subtotal - discount) * taxRate;

    const total = subtotal + tax - discount;

    const promoInputValue = isPromoApplied ? 'SAVE10' : '';

    // Определяем текст и стиль подсказки под полем промокода
    let promoHintText;
    let promoHintClass;

    if (isPromoApplied) {
        promoHintText  = 'Promo code applied successfully!';
        promoHintClass = 'promo-hint success';
    } else if (isPromoError) {
        promoHintText  = 'Invalid promo code';
        promoHintClass = 'promo-hint error';
    } else {
        promoHintText  = 'Try code "SAVE10" for 10% off';
        promoHintClass = 'promo-hint';
    }

    // Правая колонка с итогами
    const rightColumnHtml = `
        <div class="cart-summary-column">
            <div class="summary-card">
                <div class="summary-title">Order Summary</div>

                <div class="summary-row">
                    <span class="summary-subtotal-tax">Subtotal</span>
                    <span class="summary-subtotal-num">$${subtotal.toFixed(2)}</span>
                </div>

                ${discount > 0 ? `
                <div class="summary-row discount">
                    <span class="summary-discont">Discount (10%)</span>
                    <span class="summary-discont-num">-$${discount.toFixed(2)}</span>
                </div>
                ` : ''}

                <div class="summary-row">
                    <span class="summary-subtotal-tax">Tax (8%)</span>
                    <span class="summary-subtotal-num">$${tax.toFixed(2)}</span>
                </div>

                <div class="summary-row-total">
                    <span class="summary-row-name">Total</span>
                    <span class="summary-row-num">$${total.toFixed(2)}</span>
                </div>

                <div class="promo-section">
                    <div class="promo-title">Promo Code</div>
                    <div class="promo-input-group">
                        <input type="text" id="promoInput" placeholder="Enter code" class="promo-input" value="${promoInputValue}">
                        <button onclick="applyPromo()" class="promo-apply-btn" ${isPromoApplied ? 'disabled' : ''}>Apply</button>
                    </div>
                    <div class="${promoHintClass}">${promoHintText}</div>
                </div>

                <button class="checkout-btn" onclick="proceedToCheckout()">Proceed to Checkout</button>
            </div>

            <div class="shipping-card">
                <div class="shipping-information">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#155DFC" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="0.83" y="2.5" width="12.5" height="10.83" rx="1.5"/>
                        <path d="M13.33 6.67h3.34l2.5 4.17v2.5h-5.84V6.67z"/>
                        <circle cx="4.58" cy="15.42" r="2.08"/>
                        <circle cx="15.42" cy="15.42" r="2.08"/>
                    </svg>
                    <span class="shipping-title">Shipping Information</span>
                </div>

                <div class="shipping-address">
                    <div class="shipping-delivery-address">
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#99a1af" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M14 6.67C14 11.33 8 15.33 8 15.33C8 15.33 2 11.33 2 6.67C2 3.35 4.69 0.67 8 0.67C11.31 0.67 14 3.35 14 6.67Z"/>
                                <circle cx="8" cy="6.67" r="2"/>
                            </svg>
                        </span>
                        <div class="shipping-delivery-address-right">
                            <span class="shipping-address-text">Delivery Address</span><br>
                            <h>
                                123 Tech Street<br>
                                San Francisco, CA 94105
                            </h>
                        </div>
                    </div>

                    <div class="shipping-delivery">
                        <div class="shipping-label">Estimated Delivery</div>
                        <div class="shipping-delivery-text">3-5 business days</div>
                        <div class="shipping-free">Free shipping on orders over $50</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    cartContent.innerHTML = `
        <div class="cart">
            <div class="cart__container">
                <div class="cart--title">Shopping Cart</div>

                <div class="cart-two-columns">
                    <div class="cart-items-column">
                        <div class="cart-items-list">
                            ${itemsHtml}
                        </div>
                    </div>

                    ${rightColumnHtml}
                </div>
            </div>
        </div>
    `;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    renderCart();
});