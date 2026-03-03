// ==================== Mobile Menu Toggle ====================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// ==================== Contact Form Handler ====================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        // Here you would typically send the data to a backend
        // For now, we'll just show a success message
        console.log({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });

        showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        contactForm.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success', 'error');
        }, 5000);
    });
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
}

// ==================== Theme Toggle ====================

const themeToggle = document.getElementById('themeToggle');
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) themeToggle.checked = theme === 'dark';
}
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked ? 'dark' : 'light');
    });
}
// initialize theme on page load
(function() {
    const stored = localStorage.getItem('theme');
    if (stored) {
        setTheme(stored);
    } else {
        const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(prefers);
    }
})();

// ==================== Smooth Scrolling ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// ==================== Navbar Active Link ====================

window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (currentSection) {
        document.querySelector(`.nav-link[href="#${currentSection}"]`)?.classList.add('active');
    }
});

// ==================== Skill Progress Animation ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width || '100%';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill progress bars
document.querySelectorAll('.skill-progress').forEach(element => {
    element.dataset.width = element.style.width;
    element.style.width = '0%';
    observer.observe(element);
});

// ==================== Scroll Animations ====================

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.featured-item, .project-card, .cert-card, .faq-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(element);
});
