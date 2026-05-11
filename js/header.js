const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
 
if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
 
        if (mobileMenu.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
 
    const mobileLinks = document.querySelectorAll('.header__mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
 
    window.addEventListener('resize', () => {
        if (window.innerWidth > 639) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}
