// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize booking functionality
    if (document.getElementById('bookingForm')) {
        initializeBooking();
    }
    
    // Initialize contact form
    if (document.getElementById('contactForm')) {
        initializeContactForm();
    }
    
    // Initialize feedback form
    if (document.getElementById('feedbackForm')) {
        initializeFeedbackForm();
    }
    
    // Initialize login/signup forms
    if (document.getElementById('loginForm')) {
        initializeLoginForm();
    }
    
    if (document.getElementById('signupForm')) {
        initializeSignupForm();
    }
    
    // Add smooth scrolling for anchor links
    addSmoothScrolling();
    
    // Add animation classes
    addAnimations();
}

// Booking functionality
function initializeBooking() {
    const bookingForm = document.getElementById('bookingForm');
    const destinationSelect = document.getElementById('destination');
    const adultsInput = document.getElementById('adults');
    const childrenInput = document.getElementById('children');
    const durationInput = document.getElementById('duration');
    const totalAmountSpan = document.getElementById('totalAmount');
    const bookingSummary = document.getElementById('bookingSummary');
    const summaryTotal = document.getElementById('summaryTotal');
    
    const destinations = {
        'north': [
            { value: 'taj-mahal', name: 'Taj Mahal, Agra', price: 2500 },
            { value: 'golden-temple', name: 'Golden Temple, Amritsar', price: 1800 },
            { value: 'jaipur', name: 'Jaipur, Rajasthan', price: 3500 },
            { value: 'varanasi', name: 'Varanasi, Uttar Pradesh', price: 2200 }
        ],
        'south': [
            { value: 'kerala', name: 'Kerala Backwaters', price: 4500 },
            { value: 'goa', name: 'Goa Beaches', price: 3200 },
            { value: 'mysore', name: 'Mysore Palace', price: 2800 },
            { value: 'chennai', name: 'Chennai & Pondicherry', price: 3800 }
        ],
        'east': [
            { value: 'darjeeling', name: 'Darjeeling, West Bengal', price: 3500 },
            { value: 'kolkata', name: 'Kolkata City Tour', price: 2500 },
            { value: 'kaziranga', name: 'Kaziranga National Park', price: 4200 },
            { value: 'bhubaneswar', name: 'Bhubaneswar Temples', price: 2800 }
        ],
        'west': [
            { value: 'mumbai', name: 'Mumbai City Tour', price: 2800 },
            { value: 'ajanta', name: 'Ajanta & Ellora Caves', price: 3200 },
            { value: 'udaipur', name: 'Udaipur, Rajasthan', price: 3500 },
            { value: 'ahmedabad', name: 'Ahmedabad Heritage', price: 2500 }
        ]
    };

    // Get region from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const region = urlParams.get('region');
    
    // Filter destinations based on region
    let availableDestinations = [];
    if (region && destinations[region]) {
        availableDestinations = destinations[region];
        
        // Clear existing options
        destinationSelect.innerHTML = '<option value="">Select Destination</option>';
        
        // Add filtered destinations
        availableDestinations.forEach(dest => {
            const option = document.createElement('option');
            option.value = dest.value;
            option.textContent = `${dest.name} - ₹${dest.price.toLocaleString()}`;
            destinationSelect.appendChild(option);
        });
    }

    function updateBookingSummary() {
        const destinationValue = destinationSelect.value;
        const adults = parseInt(adultsInput.value) || 0;
        const children = parseInt(childrenInput.value) || 0;
        const duration = parseInt(durationInput.value) || 1;
        
        // Find the selected destination
        let selectedDestination = null;
        if (region && destinations[region]) {
            selectedDestination = destinations[region].find(dest => dest.value === destinationValue);
        } else {
            // Fallback to original logic if no region specified
            const prices = {
                'taj-mahal': 2500,
                'goa': 3200,
                'kerala': 4500,
                'jaipur': 3500,
                'darjeeling': 3500
            };
            
            if (destinationValue && prices[destinationValue]) {
                selectedDestination = {
                    name: destinationSelect.options[destinationSelect.selectedIndex].text,
                    price: prices[destinationValue]
                };
            }
        }
        
        if (selectedDestination) {
            const basePrice = selectedDestination.price;
            const totalPersons = adults + (children * 0.5); // Children at 50% price
            const total = basePrice * totalPersons * duration;
            
            bookingSummary.innerHTML = `
                <div class="mb-2">
                    <strong>Destination:</strong> ${selectedDestination.name}
                </div>
                <div class="mb-2">
                    <strong>Travelers:</strong> ${adults} Adult(s), ${children} Child(ren)
                </div>
                <div class="mb-2">
                    <strong>Duration:</strong> ${duration} day(s)
                </div>
                <div class="mb-2">
                    <strong>Base Price:</strong> ₹${basePrice} per adult per day
                </div>
            `;
            
            totalAmountSpan.textContent = total.toLocaleString();
            summaryTotal.textContent = `₹${total.toLocaleString()}`;
        } else {
            bookingSummary.innerHTML = '<p class="text-muted">Select a destination to see details</p>';
            totalAmountSpan.textContent = '0';
            summaryTotal.textContent = '₹0';
        }
    }
    
    // Add event listeners
    destinationSelect.addEventListener('change', updateBookingSummary);
    adultsInput.addEventListener('input', updateBookingSummary);
    childrenInput.addEventListener('input', updateBookingSummary);
    durationInput.addEventListener('input', updateBookingSummary);
    
    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const destination = destinationSelect.value;
        if (!destination) {
            showAlert('Please select a destination', 'danger');
            return;
        }
        
        // Simulate booking process
        const button = bookingForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading-spinner"></span> Processing...';
        button.disabled = true;
        
        setTimeout(() => {
            showAlert('Booking confirmed successfully! You will receive a confirmation email shortly.', 'success');
            bookingForm.reset();
            updateBookingSummary();
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    });
    
    // Initialize summary
    updateBookingSummary();
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading-spinner"></span> Sending...';
        button.disabled = true;
        
        setTimeout(() => {
            showAlert('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Feedback form functionality
function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingInput = document.getElementById('rating');
    
    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            // Update star colors
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.add('active');
                    s.classList.remove('text-muted');
                } else {
                    s.classList.remove('active');
                    s.classList.add('text-muted');
                }
            });
        });
        
        star.addEventListener('mouseover', function() {
            const hoverRating = parseInt(this.getAttribute('data-rating'));
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= hoverRating) {
                    s.classList.add('active');
                    s.classList.remove('text-muted');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            const currentRating = parseInt(ratingInput.value);
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating > currentRating) {
                    s.classList.remove('active');
                    s.classList.add('text-muted');
                }
            });
        });
    });
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (ratingInput.value === '0') {
            showAlert('Please provide a rating', 'danger');
            return;
        }
        
        const button = feedbackForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading-spinner"></span> Submitting...';
        button.disabled = true;
        
        setTimeout(() => {
            showAlert('Thank you for your feedback! We appreciate your input.', 'success');
            feedbackForm.reset();
            
            // Reset stars
            stars.forEach(star => {
                star.classList.remove('active');
                star.classList.add('text-muted');
            });
            ratingInput.value = '0';
            
            button.textContent = originalText;
            button.disabled = false;
        }, 1500);
    });
}

// Login form functionality
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }
        
        const button = loginForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading-spinner"></span> Logging in...';
        button.disabled = true;
        
        setTimeout(() => {
            // Set login status and timestamp in localStorage
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('loginTimestamp', Date.now().toString());
            showAlert('Login successful! Redirecting...', 'success');
            loginForm.reset();
            
            setTimeout(() => {
                // Check for redirect parameter
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect');
                
                if (redirect) {
                    window.location.href = redirect;
                } else {
                    window.location.href = 'index.html';
                }
            }, 1000);
        }, 1500);
    });
}

// Signup form functionality
function initializeSignupForm() {
    const signupForm = document.getElementById('signupForm');
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'danger');
            return;
        }
        
        const button = signupForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.innerHTML = '<span class="loading-spinner"></span> Creating account...';
        button.disabled = true;
        
        setTimeout(() => {
            showAlert('Account created successfully! Redirecting to login...', 'success');
            signupForm.reset();
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        }, 1500);
    });
}

// Utility functions
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to the top of the page
    document.body.insertBefore(alertDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

function addSmoothScrolling() {
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
}

function addAnimations() {
    // Add fade-in animation to cards and sections
    const animatedElements = document.querySelectorAll('.card, .service-card, .destination-card');
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
    });
}

// Handle URL parameters for pre-filled forms
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get('destination');
    const region = params.get('region');
    
    if (destination && document.getElementById('destination')) {
        document.getElementById('destination').value = destination;
        if (typeof updateBookingSummary === 'function') {
            updateBookingSummary();
        }
    }
    
    if (region && document.getElementById('destination')) {
        // Set destination based on region
        const regionDestinations = {
            'north': 'taj-mahal',
            'south': 'kerala',
            'east': 'darjeeling',
            'west': 'jaipur'
        };
        
        if (regionDestinations[region]) {
            document.getElementById('destination').value = regionDestinations[region];
            if (typeof updateBookingSummary === 'function') {
                updateBookingSummary();
            }
        }
    }
}

// Initialize URL parameters handling
getUrlParams();

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Mobile menu enhancement
document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }
});
