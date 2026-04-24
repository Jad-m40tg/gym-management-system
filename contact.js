document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop the page from refreshing

            // Get the values from the inputs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation check
            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields before sending.");
                return;
            }

            // Email format validation (Regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Success feedback
            console.log("Form Data Submitted:", { name, email, subject, message });
            alert(`Thank you, ${name}! Your message has been sent successfully.`);
            
            // Clear the form
            contactForm.reset();
        });
    }
});