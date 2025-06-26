// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initTestimonialSlider();
    initBackToTop();
    initCourseFilters();
    initInstructorModals();
    initContactForm();
    initScrollAnimations();
    initEnrollButtons();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Initialize first slide
    showSlide(0);
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Course Filters
function initCourseFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter courses
            courseCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Instructor Modals
function initInstructorModals() {
    const instructorCards = document.querySelectorAll('.instructor-card');
    const modal = document.getElementById('instructorModal');
    const closeBtn = document.querySelector('.close');

    if (!modal) return;

    // Instructor data
    const instructorData = {
        sarah: {
            name: 'Sarah Johnson',
            title: 'Senior Software Engineer',
            specialty: 'Programming & Web Development',
            image: 'images/instructor1.jpg',
            stats: ['★ 4.9 Rating', '5,200+ Students', '8 Courses'],
            bio: 'Former Google engineer with 10+ years of experience in full-stack development. Passionate about teaching modern web technologies and best practices. Sarah has worked on large-scale applications serving millions of users and brings real-world insights to every lesson.',
            skills: ['JavaScript', 'React', 'Python', 'Node.js', 'MongoDB', 'AWS'],
            courses: ['Complete Programming Bootcamp', 'Advanced JavaScript & React', 'Full-Stack Development', 'Python for Beginners']
        },
        michael: {
            name: 'Michael Chen',
            title: 'Creative Director',
            specialty: 'UI/UX Design & Visual Arts',
            image: 'images/instructor2.jpg',
            stats: ['★ 4.8 Rating', '3,800+ Students', '6 Courses'],
            bio: 'Award-winning designer with experience at top agencies like IDEO and Pentagram. Specializes in user-centered design and design thinking methodologies. Michael has led design teams for Fortune 500 companies and startups alike.',
            skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'Design Systems', 'User Research', 'Sketch'],
            courses: ['UI/UX Design Mastery', 'Graphic Design Fundamentals', 'Design Systems', 'User Research Methods']
        },
        emily: {
            name: 'Emily Rodriguez',
            title: 'Marketing Director',
            specialty: 'Digital Marketing & Strategy',
            image: 'images/instructor3.jpg',
            stats: ['★ 4.7 Rating', '6,100+ Students', '7 Courses'],
            bio: 'Former VP of Marketing at several Fortune 500 companies. Expert in digital transformation and growth marketing strategies that drive real results. Emily has helped companies increase their revenue by 300% through strategic marketing initiatives.',
            skills: ['SEO/SEM', 'Social Media', 'Analytics', 'Content Strategy', 'Email Marketing', 'PPC'],
            courses: ['Digital Marketing Strategy', 'Social Media Marketing Mastery', 'SEO Fundamentals', 'Content Marketing']
        },
        david: {
            name: 'David Kim',
            title: 'Data Scientist',
            specialty: 'Data Science & Machine Learning',
            image: 'images/instructor1.jpg',
            stats: ['★ 4.9 Rating', '2,900+ Students', '5 Courses'],
            bio: 'PhD in Computer Science with expertise in machine learning and AI. Previously worked at Microsoft Research and published 20+ papers in top-tier conferences. David specializes in making complex data science concepts accessible to everyone.',
            skills: ['Python', 'Machine Learning', 'TensorFlow', 'Statistics', 'R', 'SQL'],
            courses: ['Data Science & Analytics', 'Machine Learning Fundamentals', 'Python for Data Science', 'Statistics for Data Science']
        },
        lisa: {
            name: 'Lisa Thompson',
            title: 'Business Consultant',
            specialty: 'Project Management & Leadership',
            image: 'images/instructor2.jpg',
            stats: ['★ 4.8 Rating', '4,200+ Students', '6 Courses'],
            bio: 'Certified PMP with 15+ years of experience leading cross-functional teams. Helped over 100 companies optimize their project management processes. Lisa specializes in Agile methodologies and organizational transformation.',
            skills: ['Agile/Scrum', 'Leadership', 'Strategic Planning', 'Team Management', 'Risk Management', 'Stakeholder Management'],
            courses: ['Project Management Essentials', 'Agile Leadership', 'Strategic Planning', 'Team Building']
        }
    };

    // Add click event to instructor cards
    instructorCards.forEach(card => {
        const viewProfileBtn = card.querySelector('.view-profile-btn');
        if (viewProfileBtn) {
            viewProfileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const instructorId = card.getAttribute('data-instructor');
                const instructor = instructorData[instructorId];
                
                if (instructor) {
                    showInstructorModal(instructor);
                }
            });
        }
    });

    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showInstructorModal(instructor) {
        document.getElementById('modalInstructorImage').src = instructor.image;
        document.getElementById('modalInstructorImage').alt = instructor.name;
        document.getElementById('modalInstructorName').textContent = instructor.name;
        document.getElementById('modalInstructorTitle').textContent = instructor.title;
        document.getElementById('modalInstructorSpecialty').textContent = instructor.specialty;
        
        // Stats
        const statsContainer = document.getElementById('modalInstructorStats');
        statsContainer.innerHTML = instructor.stats.map(stat => 
            `<span>${stat}</span>`
        ).join('');

        // Bio
        document.getElementById('modalInstructorBio').textContent = instructor.bio;

        // Skills
        const skillsContainer = document.getElementById('modalInstructorSkills');
        skillsContainer.innerHTML = instructor.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        // Courses
        const coursesContainer = document.getElementById('modalInstructorCourses');
        coursesContainer.innerHTML = instructor.courses.map(course => 
            `<div class="course-item">${course}</div>`
        ).join('');

        modal.style.display = 'block';
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Show success modal
                if (successModal) {
                    successModal.style.display = 'block';
                } else {
                    alert('Thank you for your message! We\'ll get back to you soon.');
                }
            }, 1500);
        });
    }

    // Success modal close
    if (successModal) {
        const closeBtn = successModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                successModal.style.display = 'none';
            });
        }

        window.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.course-card, .instructor-card, .value-item, .benefit-item, .faq-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Enroll Buttons
function initEnrollButtons() {
    const enrollButtons = document.querySelectorAll('.enroll-btn');

    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get course title
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('h3').textContent;
            
            // Simulate enrollment process
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = 'Enrolled!';
                this.style.background = '#28a745';
                
                // Show success message
                alert(`Successfully enrolled in "${courseTitle}"! You will receive a confirmation email shortly.`);
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.background = '';
                }, 2000);
            }, 1500);
        });
    });
}

// Smooth scrolling for anchor links
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

// Add loading animation to images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // Add loading class if image is not yet loaded
        if (!img.complete) {
            img.classList.add('loading');
        }
    });
}

// Initialize image loading
initImageLoading();

// Add CSS for image loading states
const style = document.createElement('style');
style.textContent = `
    img.loading {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.loaded {
        opacity: 1;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
}

// Initialize accessibility features
initAccessibility();

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Failed to load image:', e.target.src);
    }
}, true);

// Add page visibility API for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Console welcome message
console.log('%cWelcome to EduPlatform! 🎓', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #666; font-size: 14px;');

