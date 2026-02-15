// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        once: true,
        duration: 1000,
        offset: 50,
        easing: 'ease-out-cubic'
    });

    // Custom Cursor Logic
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor', 'hidden', 'md:block');
    document.body.appendChild(cursor);

    // Style the cursor via JS to ensure it exists on all pages without extra CSS file dependency if not present
    // But we rely on the Tailwind classes/CSS in head.
    // Let's ensure the CSS class exists in the head or add it here.
    // Adding style dynamically for the cursor just in case
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-cursor {
            width: 20px;
            height: 20px;
            border: 1px solid #D4AF37;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease-out, background-color 0.2s;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
        }
        .cursor-hover {
            transform: translate(-50%, -50%) scale(2.5);
            background-color: rgba(212, 175, 55, 0.2);
            border-color: transparent;
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .cursor-pointer');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('py-2', 'shadow-lg');
                navbar.classList.remove('py-4');
            } else {
                navbar.classList.add('py-4');
                navbar.classList.remove('py-2', 'shadow-lg');
            }
        });
    }

    // Mobile Menu Toggle (if present)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        let isMenuOpen = false;
        mobileBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                mobileBtn.innerHTML = '<i class="fa-solid fa-times text-2xl"></i>';
                // Lock scroll
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
                // Unlock scroll
                document.body.style.overflow = '';
            }
        });
    }

    // Product Filtering Logic
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const products = document.querySelectorAll('.product-card');
    const productCount = document.getElementById('product-count');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button style
                filterButtons.forEach(b => {
                    b.classList.remove('text-lorito-gold', 'font-bold');
                    b.classList.add('hover:text-lorito-gold');
                });
                btn.classList.add('text-lorito-gold', 'font-bold');
                btn.classList.remove('hover:text-lorito-gold');

                const filter = btn.getAttribute('data-filter');
                let visibleCount = 0;

                products.forEach(product => {
                    const category = product.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        product.style.display = 'block';
                        // Re-trigger AOS
                        product.classList.remove('aos-animate');
                        setTimeout(() => product.classList.add('aos-animate'), 50);
                        visibleCount++;
                    } else {
                        product.style.display = 'none';
                    }
                });

                if (productCount) {
                    productCount.textContent = visibleCount;
                }
            });
        });
    }
});
