// Navigation highlight on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Highlight active section in navigation
    const highlightNavigation = () => {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);

    // Form handling
    const handleForm = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Here you would typically send the data to your backend
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            showMessage(form, 'Message sent successfully!', 'success');
            form.reset();
        } catch (error) {
            showMessage(form, 'Failed to send message. Please try again.', 'error');
        } finally {
            // Reset button state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    };

    // Add form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleForm);
    });

    // Message display helper
    const showMessage = (form, message, type) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Remove any existing messages
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        form.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 5000);
    };

    // Add scroll animations
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('animate-hidden');
            observer.observe(card);
        });

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate-hidden');
            observer.observe(section);
        });
    };

    observeElements();
});

// Initialize EmailJS
(function() {
    emailjs.init("6zVi_GCjvG6But-ay"); // Your EmailJS public key
})();

// Get the contact form
const contactForm = document.getElementById('contact-form');

// Add submit event listener
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
    const message = contactForm.querySelector('textarea').value;

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Send email using EmailJS
    emailjs.send("service_394i84i", "template_wal7wak", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: "Wilson Kevin",
        to_email: "wilsonkevinngatia@gmail.com"
    })
    .then(function() {
        // Show success message
        alert("Message sent successfully!");
        contactForm.reset();
    })
    .catch(function(error) {
        // Show error message
        alert("Failed to send message. Please try again.");
        console.error("Error:", error);
    })
    .finally(function() {
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    });
}); 