// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// Cursor Personalizado
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    follower.style.left = e.clientX + 'px';
    follower.style.top = e.clientY + 'px';
});

document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
});

// Efeito hover em links e botões
const hoverElements = document.querySelectorAll('a, button, .social-icon, .btn');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        follower.style.transform = 'scale(1.5)';
        follower.style.borderColor = 'var(--accent-color)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.borderColor = 'var(--primary-color)';
    });
});

// Menu Mobile
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
};

// Scroll Spying
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 100);
    
    // Close mobile menu on scroll
    if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
    }
});

// Typed.js
const typed = new Typed('.typed-text', {
    strings: ['Web', 'Mobile', 'Full Stack', 'Software'],
    typeSpeed: 100,
    backSpeed: 60,
    backDelay: 2000,
    loop: true,
    showCursor: false
});

// ScrollReveal Animations
ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    reset: false
});

ScrollReveal().reveal('.home-content, .section-title', { origin: 'top', interval: 200 });
ScrollReveal().reveal('.home-img, .about-img, .service-card, .portfolio-item', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.about-content, .contact-info', { origin: 'left' });
ScrollReveal().reveal('.contact-form', { origin: 'right' });

// Stats Counter Animation
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
};

// Trigger stats animation when in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(document.querySelector('.stats-container'));

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Parallax effect on home section
gsap.to('.home-img', {
    scrollTrigger: {
        trigger: '.home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 100,
    opacity: 0.5
});

// Floating animation for tech icons
gsap.to('.tech-icons i', {
    y: -20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: 0.2
});

// Service cards animation on scroll
gsap.from('.service-card', {
    scrollTrigger: {
        trigger: '.services',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2
});

// Smooth scroll for navigation links
document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Download CV function
function Download() {
    const fileUrl = '../Adolfo Monteiro Manuel - Currículo.pdf';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Adolfo_Monteiro_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback animation
    const btn = document.getElementById('Download');
    btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> Download iniciado!';
    setTimeout(() => {
        btn.innerHTML = '<i class="fa-regular fa-file-pdf"></i> Baixar CV';
    }, 3000);
}

// Form submission (prevent default for demo)
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fa-regular fa-circle-check"></i> Mensagem enviada!';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        e.target.reset();
    }, 3000);
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// Theme toggle (opcional)
const createThemeToggle = () => {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fa-regular fa-moon"></i>';
    toggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        box-shadow: var(--shadow-md);
    `;
    
    document.body.appendChild(toggle);
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        toggle.innerHTML = document.body.classList.contains('dark-theme') 
            ? '<i class="fa-regular fa-sun"></i>' 
            : '<i class="fa-regular fa-moon"></i>';
    });
};

createThemeToggle();