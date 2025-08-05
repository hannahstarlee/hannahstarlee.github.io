// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
    
    // Add click event listeners to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
    
    // Add active state to navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
        
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add fade-in animation for sections when they come into view
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
    
    // Observe all sections except the landing page
    const sections = document.querySelectorAll('section:not(.landing)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// Add hover effects for work items
document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing effect for the main title (optional)
document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const nameLines = document.querySelectorAll('.name-line');
        
        // Clear the content
        nameLines.forEach(line => {
            line.textContent = '';
        });
        
        let currentLine = 0;
        let currentChar = 0;
        const originalTexts = ['HANNAH', 'STAR', 'LEE'];
        
        const typeWriter = () => {
            if (currentLine < nameLines.length) {
                if (currentChar < originalTexts[currentLine].length) {
                    nameLines[currentLine].textContent += originalTexts[currentLine].charAt(currentChar);
                    currentChar++;
                    setTimeout(typeWriter, 100);
                } else {
                    currentLine++;
                    currentChar = 0;
                    setTimeout(typeWriter, 100);
                }
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
        
        // Show location info after name finishes typing
        const locationInfo = document.querySelector('.location-info');
        if (locationInfo) {
            // Calculate total typing time: 3 lines * ~6 characters each * 100ms = ~1800ms + 500ms delay
            setTimeout(() => {
                locationInfo.classList.add('show');
            }, 2300);
        }
    }
}); 