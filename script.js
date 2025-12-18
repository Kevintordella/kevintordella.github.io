// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#'
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in animation on scroll
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

// Apply fade-in to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Update progress navigation on case study pages
    updateProgressNav();
});

// Progress Navigation for Case Studies
function updateProgressNav() {
    const progressItems = document.querySelectorAll('.progress-item');
    if (progressItems.length === 0) return;

    const progressNav = document.querySelector('.progress-nav');
    if (!progressNav) return;

    // Check if we should hide the nav during personas section
    const personasSection = document.getElementById('personas-section');
    const windowWidth = window.innerWidth;
    
    // Simply hide during personas at all desktop/tablet sizes
    if (personasSection && windowWidth > 768) {
        const rect = personasSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of personas is visible
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const sectionHeight = rect.height;
        const visibilityPercentage = visibleHeight / sectionHeight;
        
        // Also check if we're past the personas section (into the callout box area)
        const scrolledPastPersonas = rect.bottom < viewportHeight * 0.3;
        
        // Hide when personas is visible, show when scrolled past
        if (visibilityPercentage > 0.3 && !scrolledPastPersonas) {
            progressNav.style.opacity = '0';
            progressNav.style.pointerEvents = 'none';
        } else {
            progressNav.style.opacity = '1';
            progressNav.style.pointerEvents = 'auto';
        }
    } else {
        progressNav.style.opacity = '1';
        progressNav.style.pointerEvents = 'auto';
    }

    const sections = [];
    progressItems.forEach(item => {
        const targetId = item.getAttribute('href').substring(1);
        const section = document.getElementById(targetId);
        if (section) {
            sections.push({
                id: targetId,
                top: section.offsetTop,
                bottom: section.offsetTop + section.offsetHeight,
                item: item
            });
        }
    });

    const scrollPosition = window.scrollY + 200;
    let activeSection = null;

    for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sections[i].top) {
            activeSection = sections[i];
            break;
        }
    }

    progressItems.forEach(item => {
        item.classList.remove('active');
    });

    if (activeSection) {
        activeSection.item.classList.add('active');
    }
}

// Smooth scroll for progress nav
document.querySelectorAll('.progress-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 50;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});