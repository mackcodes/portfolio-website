// Portfolio Website JavaScript

// Project data
const projects = [
    {
        id: 1,
        title: "Programming Contest Platform",
        description: "A comprehensive web platform for organizing and participating in coding competitions with real-time judging, leaderboards, and problem management.",
        longDescription: "Developed a full-stack web application that enables educational institutions to host programming contests. Features include user authentication, problem submission system, real-time code execution and judging, live leaderboards, and administrative dashboard for contest management.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
        category: "web",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
        github: "https://github.com/alexjohnson/contest-platform",
        demo: "https://contest-platform-demo.com",
        features: ["Real-time judging", "Live leaderboards", "Problem management", "User authentication"]
    },
    {
        id: 2,
        title: "Personal Portfolio Website",
        description: "A responsive and modern portfolio website built with the latest web technologies, featuring dark mode, smooth animations, and interactive elements.",
        longDescription: "Created a professional portfolio website showcasing projects, skills, and experience. Implemented responsive design principles, smooth scrolling navigation, dark/light mode toggle, and optimized performance for fast loading times.",
        technologies: ["HTML5", "CSS3", "JavaScript", "SCSS"],
        category: "web",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        github: "https://github.com/alexjohnson/portfolio",
        demo: "https://alexjohnson-portfolio.com",
        features: ["Responsive design", "Dark mode toggle", "Smooth animations", "Contact form"]
    },
    {
        id: 3,
        title: "Task Management App",
        description: "A full-stack task management application with features for project organization, team collaboration, and progress tracking.",
        longDescription: "Built a comprehensive task management system that allows users to create projects, assign tasks, set deadlines, and track progress. Includes team collaboration features, file attachments, and detailed analytics dashboard.",
        technologies: ["React", "Express.js", "PostgreSQL", "Redux"],
        category: "app",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        github: "https://github.com/alexjohnson/task-manager",
        demo: "https://taskmanager-demo.com",
        features: ["Project management", "Team collaboration", "Progress tracking", "File attachments"]
    },
    {
        id: 4,
        title: "Algorithm Visualizer",
        description: "An interactive web application for visualizing sorting and searching algorithms with step-by-step animations and educational content.",
        longDescription: "Developed an educational tool that helps students understand various algorithms through visual representations. Features interactive controls, speed adjustment, step-by-step execution, and detailed explanations of algorithm complexity.",
        technologies: ["JavaScript", "HTML5 Canvas", "CSS3", "Chart.js"],
        category: "educational",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        github: "https://github.com/alexjohnson/algorithm-visualizer",
        demo: "https://algo-visualizer-demo.com",
        features: ["Interactive visualizations", "Multiple algorithms", "Speed controls", "Educational content"]
    }
];

// Typing animation
const typingTexts = [
    "Computer Science Student & Developer",
    "Competitive Programming Enthusiast",
    "Full Stack Web Developer",
    "Algorithm Design Specialist"
];

let textIndex = 0;
let charIndex = 0;
let currentText = '';
let isDeleting = false;

function typeText() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    if (isDeleting) {
        currentText = typingTexts[textIndex].substring(0, charIndex - 1);
        charIndex--;
    } else {
        currentText = typingTexts[textIndex].substring(0, charIndex + 1);
        charIndex++;
    }
    
    typingElement.textContent = currentText;
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === typingTexts[textIndex].length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeText, typeSpeed);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
}

// Theme toggle - Fixed implementation

// JS: apply theme using the checkbox state, persist to localStorage
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    html.setAttribute("data-color-scheme", theme);
    localStorage.setItem("theme", theme);
    if (toggle) toggle.checked = theme === "dark";
  }

  // initialize from saved theme or system preference
  const saved = localStorage.getItem("theme");
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  // listener
  if (toggle) {
    toggle.addEventListener("change", () => {
      applyTheme(toggle.checked ? "dark" : "light");
    });
  }
});


// Smooth scrolling for navigation links - Fixed implementation
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const offsetTop = element.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = 'home';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const level = item.getAttribute('data-level');
            const progressBar = item.querySelector('.skill-progress');
            
            if (progressBar && !progressBar.style.width) {
                progressBar.style.width = level + '%';
            }
        }
    });
}

// Project filtering - Fixed implementation
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter project cards with animation
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.classList.remove('hide');
            }, 10);
        } else {
            card.classList.add('hide');
            setTimeout(() => {
                if (card.classList.contains('hide')) {
                    card.style.display = 'none';
                }
            }, 300);
        }
    });
}

// Open project modal - Fixed implementation
function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (!modal || !modalBody) return;
    
    modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
        <h2 class="modal-project-title">${project.title}</h2>
        <p class="modal-project-description">${project.longDescription}</p>
        
        <div class="modal-project-features">
            <h4>Key Features:</h4>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-project-tech">
            <h4>Technologies Used:</h4>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="modal-project-links">
            <a href="${project.github}" target="_blank" class="btn btn--primary">
                <i class="fab fa-github"></i> View Code
            </a>
            <a href="${project.demo}" target="_blank" class="btn btn--outline">
                <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
        </div>
    `;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close project modal
function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
    
    if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        form.reset();
        if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }, 2000);
}

// Show/hide back to top button
function toggleBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize theme
function initializeTheme() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (!icon) return;
    
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.setAttribute('data-color-scheme', 'dark');
        icon.className = 'fas fa-sun';
    } else {
        html.setAttribute('data-color-scheme', 'light');
        icon.className = 'fas fa-moon';
    }
}

// Add event listeners for project cards
function setupProjectCards() {
    // Add click events to "View Details" buttons
    document.addEventListener('click', (e) => {
        if (e.target.matches('button[onclick*="openModal"]')) {
            e.preventDefault();
            const onclickAttr = e.target.getAttribute('onclick');
            const projectId = parseInt(onclickAttr.match(/\d+/)[0]);
            openModal(projectId);
        }
    });
}

// Initialize the website
function init() {
    // Initialize theme first
    initializeTheme();
    
    // Start typing animation
    setTimeout(typeText, 1000);
    
    // Setup project cards
    setupProjectCards();
    
    // Add event listeners
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const backToTop = document.getElementById('back-to-top');
    const contactForm = document.getElementById('contact-form');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Navigation link event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            if (target) {
                smoothScroll(target);
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const mobileMenu = document.getElementById('mobile-menu');
                if (navMenu && mobileMenu) {
                    navMenu.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Project filter event listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            if (filter) {
                filterProjects(filter);
            }
        });
    });
    
    // Hero buttons event listeners
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('href');
            if (target) {
                smoothScroll(target);
            }
        });
    });
    
    // Scroll event listeners
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            updateActiveNavLink();
            toggleBackToTop();
        }, 10);
        
        animateSkillBars();
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Initial animations
    setTimeout(() => {
        animateSkillBars();
        updateActiveNavLink();
    }, 500);
}

// Load event
document.addEventListener('DOMContentLoaded', init);

// Window load event for additional animations
window.addEventListener('load', () => {
    // Trigger skill bar animations after page load
    setTimeout(animateSkillBars, 1000);
});

// Intersection Observer for scroll animations
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

// Observe elements for scroll animations
window.addEventListener('load', () => {
    const animateElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    }
});

// Prevent default link behavior for demo links (since they're not real)
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="demo.com"]');
    if (link) {
        e.preventDefault();
        alert('This is a demo link. In a real portfolio, this would link to the live project.');
    }
});

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;