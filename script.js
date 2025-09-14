// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = 70; // Height of fixed header
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Simple fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding tab pane
            const targetPane = document.getElementById(targetTab + '-tab');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// PDF Zoom functionality
let currentZoom = 1;
const maxZoom = 3;
const minZoom = 0.5;

function zoomIn() {
    if (currentZoom < maxZoom) {
        currentZoom += 0.25;
        updatePdfZoom();
        updateZoomButtons();
    }
}

function zoomOut() {
    if (currentZoom > minZoom) {
        currentZoom -= 0.25;
        updatePdfZoom();
        updateZoomButtons();
    }
}


function updatePdfZoom() {
    const pdfViewer = document.getElementById('pdf-viewer');
    const pdfObject = pdfViewer.querySelector('object');
    const pdfIframe = pdfViewer.querySelector('iframe');

    if (pdfViewer) {
        if (currentZoom > 1) {
            pdfViewer.classList.add('zoomed');
            if (pdfObject) {
                pdfObject.style.transform = `scale(${currentZoom})`;
                pdfObject.style.width = `${100 / currentZoom}%`;
            }
            if (pdfIframe) {
                pdfIframe.style.transform = `scale(${currentZoom})`;
                pdfIframe.style.width = `${100 / currentZoom}%`;
            }
        } else {
            pdfViewer.classList.remove('zoomed');
            if (pdfObject) {
                pdfObject.style.transform = `scale(${currentZoom})`;
                pdfObject.style.width = currentZoom === 1 ? '100%' : `${100 / currentZoom}%`;
            }
            if (pdfIframe) {
                pdfIframe.style.transform = `scale(${currentZoom})`;
                pdfIframe.style.width = currentZoom === 1 ? '100%' : `${100 / currentZoom}%`;
            }
        }
    }
}

function updateZoomButtons() {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');

    if (zoomInBtn) {
        zoomInBtn.disabled = currentZoom >= maxZoom;
    }
    if (zoomOutBtn) {
        zoomOutBtn.disabled = currentZoom <= minZoom;
    }
}

// Initialize PDF zoom on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial zoom for mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        currentZoom = 1;
        setTimeout(updatePdfZoom, 1000); // Delay to ensure PDF is loaded
    }
    updateZoomButtons();
});