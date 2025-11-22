// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links (additional support)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery Modal
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const galleryItems = document.querySelectorAll('.gallery-item');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
let currentImageIndex = 0;

// Open modal with clicked image
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        const imgSrc = item.getAttribute('data-image');
        modalImg.src = imgSrc;
        currentImageIndex = index;
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Navigate to previous image
modalPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    const imgSrc = galleryItems[currentImageIndex].getAttribute('data-image');
    modalImg.src = imgSrc;
});

// Navigate to next image
modalNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    const imgSrc = galleryItems[currentImageIndex].getAttribute('data-image');
    modalImg.src = imgSrc;
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            modalPrev.click();
        } else if (e.key === 'ArrowRight') {
            modalNext.click();
        }
    }
});

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const roomType = document.getElementById('room-type').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const specialRequests = document.getElementById('special-requests').value;
    
    // Validate dates
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkinDate < today) {
        alert('Check-in date cannot be in the past.');
        return;
    }
    
    if (checkoutDate <= checkinDate) {
        alert('Check-out date must be after check-in date.');
        return;
    }
    
    // Calculate nights
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    // Room prices
    const roomPrices = {
        'deluxe': 299,
        'executive': 499,
        'presidential': 899
    };
    
    const totalCost = roomPrices[roomType] * nights;
    
    // Create confirmation message
    const roomNames = {
        'deluxe': 'Deluxe Ocean View',
        'executive': 'Executive Suite',
        'presidential': 'Presidential Suite'
    };
    
    let message = `Booking Summary:\n\n`;
    message += `Guest: ${name}\n`;
    message += `Email: ${email}\n`;
    message += `Phone: ${phone}\n\n`;
    message += `Room: ${roomNames[roomType]}\n`;
    message += `Check-in: ${checkin}\n`;
    message += `Check-out: ${checkout}\n`;
    message += `Guests: ${guests}\n`;
    message += `Nights: ${nights}\n`;
    message += `Total Cost: $${totalCost}\n`;
    
    if (specialRequests) {
        message += `\nSpecial Requests: ${specialRequests}\n`;
    }
    
    message += `\nThank you for choosing Azure Bay Hotel! We'll send a confirmation email to ${email} shortly.`;
    
    alert(message);
    
    // Reset form
    bookingForm.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Set minimum date for check-in to today
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').setAttribute('min', today);

// Update minimum check-out date when check-in changes
document.getElementById('checkin').addEventListener('change', (e) => {
    const checkinDate = new Date(e.target.value);
    checkinDate.setDate(checkinDate.getDate() + 1);
    const minCheckout = checkinDate.toISOString().split('T')[0];
    document.getElementById('checkout').setAttribute('min', minCheckout);
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.room-card, .amenity-card, .gallery-item, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Initialize AOS-like animations for section headers
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(header);
});

// Add loading effect
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console welcome message
console.log('%c🏨 Welcome to Azure Bay Hotel', 'color: #1e3a8a; font-size: 20px; font-weight: bold;');
console.log('%cWebsite built with vanilla HTML, CSS, and JavaScript', 'color: #0ea5e9; font-size: 14px;');
