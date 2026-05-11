function setAddedState(btn) {
    btn.textContent = 'Added to Cart';
    btn.style.backgroundColor = '#10b981';
}

function handleAddToCart(event, productId, btn) {
    event.stopPropagation();
    addToCart(productId);
    setAddedState(btn);
}

let currentSort = 'name';
let ratingFilter = { '5+ Stars': false, '4+ Stars': false, '3+ Stars': false };
let priceRange = { min: 0, max: 3000 };
let dragThumb = null;
let updateTimeout = null;

document.addEventListener('DOMContentLoaded', function() {
    if (typeof products === 'undefined') return;

    initMobileFilters();
    showProducts();

    // ----- сортировка -----
    const sortBtn = document.querySelector('.sort__button');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortItems = document.querySelectorAll('.dropdown__item');

    if (sortBtn) {
        sortBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            sortDropdown.classList.toggle('show');
        });
    }

    document.addEventListener('click', function(e) {
        if (sortBtn && sortDropdown && !sortBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
            sortDropdown.classList.remove('show');
        }
    });

    sortItems.forEach(function(item) {
        item.addEventListener('click', function() {
            currentSort = this.dataset.value;
            if (sortBtn) {
                sortBtn.querySelector('.button__text-selected').textContent = this.textContent;
            }
            sortItems.forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            sortDropdown.classList.remove('show');
            showProducts();
        });
    });

    // ----- фильтр по рейтингу -----
    const ratingBoxes = document.querySelectorAll('.rating__checkbox');
    const ratingTypes = ['5+ Stars', '4+ Stars', '3+ Stars'];

    ratingBoxes.forEach(function(box, i) {
        box.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('checked');
            ratingFilter[ratingTypes[i]] = this.classList.contains('checked');
            showProducts();
        });
    });

    // ----- кнопка очистки -----
    const clearBtn = document.querySelector('.main__button-clear-filtr');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            ratingBoxes.forEach(box => box.classList.remove('checked'));
            ratingFilter = { '5+ Stars': false, '4+ Stars': false, '3+ Stars': false };
            priceRange = { min: 0, max: 3000 };
            updateSliderPos();
            showProducts();
        });
    }

    // ----- слайдер цен -----
    const minThumb = document.getElementById('thumbMin');
    const maxThumb = document.getElementById('thumbMax');
    const track = document.getElementById('sliderTrack');
    const minPriceLabel = document.querySelector('.main__price-min');
    const maxPriceLabel = document.querySelector('.main__price-max');

    function getClientX(e) {
        return e.touches ? e.touches[0].clientX : e.clientX;
    }

    function updateSliderPos() {
        if (!minThumb || !maxThumb || !track) return;

        const minPos = 8 + (priceRange.min / 3000) * 190;
        const maxPos = 8 + (priceRange.max / 3000) * 190;
        minThumb.style.left = minPos + 'px';
        maxThumb.style.left = maxPos + 'px';

        if (minPriceLabel) minPriceLabel.textContent = '$' + priceRange.min;
        if (maxPriceLabel) maxPriceLabel.textContent = '$' + priceRange.max;

        const minP = (priceRange.min / 3000) * 100;
        const maxP = (priceRange.max / 3000) * 100;
        track.style.background = `linear-gradient(to right, #D1D5DC 0%, #D1D5DC ${minP}%, #030213 ${minP}%, #030213 ${maxP}%, #D1D5DC ${maxP}%, #D1D5DC 100%)`;
    }

    function updateProductsWithDelay() {
        if (updateTimeout) clearTimeout(updateTimeout);
        updateTimeout = setTimeout(() => {
            showProducts();
            updateTimeout = null;
        }, 50);
    }

    function onDrag(e) {
        if (!dragThumb || !track) return;
        e.preventDefault();

        const trackRect = track.getBoundingClientRect();
        let x = getClientX(e) - trackRect.left;
        x = Math.max(8, Math.min(x, 198));

        const newVal = Math.round(((x - 8) / 190) * 3000 / 10) * 10;

        if (dragThumb === minThumb && newVal < priceRange.max) {
            priceRange.min = newVal;
        } else if (dragThumb === maxThumb && newVal > priceRange.min) {
            priceRange.max = newVal;
        }

        updateSliderPos();
        updateProductsWithDelay();
    }

    function stopDrag() {
        dragThumb = null;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', stopDrag);

        if (updateTimeout) {
            clearTimeout(updateTimeout);
            updateTimeout = null;
        }
        showProducts();
    }

    function startDrag(thumb) {
        return function(e) {
            e.preventDefault();
            dragThumb = thumb;
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('touchend', stopDrag);
        };
    }

    if (minThumb) {
        minThumb.addEventListener('mousedown', startDrag(minThumb));
        minThumb.addEventListener('touchstart', startDrag(minThumb), { passive: false });
    }

    if (maxThumb) {
        maxThumb.addEventListener('mousedown', startDrag(maxThumb));
        maxThumb.addEventListener('touchstart', startDrag(maxThumb), { passive: false });
    }

    updateSliderPos();
});

// ----- мобильный сайдбар -----
function initMobileFilters() {
    const mobileFiltersBtn = document.getElementById('mobileFiltersBtn');
    const closeFiltersBtn = document.getElementById('closeFiltersBtn');
    const sidebarFilter = document.getElementById('sidebarFilter');
    const overlay = document.getElementById('mobileOverlay');

    if (!sidebarFilter) return;

    function openFilters() {
        if (window.innerWidth <= 1024) {
            sidebarFilter.classList.add('mobile-open');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFilters() {
        sidebarFilter.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileFiltersBtn) mobileFiltersBtn.addEventListener('click', openFilters);
    if (closeFiltersBtn) closeFiltersBtn.addEventListener('click', closeFilters);
    if (overlay) overlay.addEventListener('click', closeFilters);

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) closeFilters();
    });
}

// ----- отображение звёзд рейтинга -----
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
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="#fdc700" stroke-width="3" style="clip-path: inset(0 50% 0 0);" stroke-linejoin="round" fill="#fdc700">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
        `;
    }

    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="#e5e7eb" stroke-width="3" stroke-linejoin="round" fill="#e5e7eb">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
        `;
    }
    return starsHtml;
}

// ----- создание карточки товара -----
function createProductCard(product) {
    const stars = renderStars(product.rating);

    return `
        <div class="main__product-card" data-product-id="${product.id}" onclick="location.href='product.html?id=${product.id}'">
            <div class="main__product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="main__product-info">
                <p class="main__product-title">${product.name}</p>
                <div class="main__product-rating">
                    <div class="main__product-rating-stars">
                        ${stars}
                    </div>
                    <span class="main__rating-value">(${product.rating})</span>
                </div>
                <div class="main__product-price-category">
                    <span class="main__product-price">$${product.price}</span>
                    <span class="main__product-category">${product.category}</span>
                </div>
                <button
                    class="main__product-add-btn"
                    onclick="handleAddToCart(event, ${product.id}, this)"
                >Add to Cart</button>
            </div>
        </div>
    `;
}

// ----- отображение товаров -----
function renderProducts(productsToRender) {
    const productsContainer = document.querySelector('.main__content__card');
    const productCountSpan = document.getElementById('productCount');

    if (!productsContainer) return;

    if (!productsToRender || productsToRender.length === 0) {
        productsContainer.innerHTML = `
            <div class="empty-state">
                <p class="empty-products">No products found</p>
                <p class="empty-products-sub">Try adjusting your filters</p>
            </div>
        `;
        if (productCountSpan) productCountSpan.textContent = '0 products';
        return;
    }

    productsContainer.innerHTML = '';
    productsToRender.forEach(product => {
        productsContainer.innerHTML += createProductCard(product);
    });

    // Подсвечиваем кнопки товаров, которые уже в корзине
    if (typeof cart !== 'undefined') {
        document.querySelectorAll('.main__product-card').forEach(card => {
            const id = card.dataset.productId;
            if (cart.some(item => item.id == id)) {
                const btn = card.querySelector('.main__product-add-btn');
                if (btn) setAddedState(btn);
            }
        });
    }

    if (productCountSpan) {
        productCountSpan.textContent = `${productsToRender.length} ${productsToRender.length === 1 ? 'product' : 'products'}`;
    }
}

// ----- главная функция фильтрации и сортировки -----
function showProducts() {
    if (typeof products === 'undefined') return;

    let filtered = products.filter(function(item) {
        let ratingPass = true;
        if (ratingFilter['5+ Stars'] && item.rating < 5) ratingPass = false;
        if (ratingFilter['4+ Stars'] && item.rating < 4) ratingPass = false;
        if (ratingFilter['3+ Stars'] && item.rating < 3) ratingPass = false;
        const pricePass = item.price >= priceRange.min && item.price <= priceRange.max;
        return ratingPass && pricePass;
    });

    if (currentSort === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'name-z') {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}