// 1. Select the elements from the DOM
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// A helper function to validate email format using Regex
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 2. Listen for the form submission
contactForm.addEventListener('submit', (event) => {
    // Stop the page from reloading instantly
    event.preventDefault(); 
    
    let isFormValid = true;

    // 3. Validation Logic
    if (nameInput.value.trim().length < 2) {
        // You can add logic here to show a red border or error text
        console.error('Name must be at least 2 characters');
        isFormValid = false;
    }

    if (!isValidEmail(emailInput.value.trim())) {
        console.error('Please enter a valid email');
        isFormValid = false;
    }

    if (subjectInput.value.trim().length < 5) {
        console.error('Subject must be at least 5 characters');
        isFormValid = false;
    }

    if (messageInput.value.trim().length < 20) {
        console.error('Message must be at least 20 characters');
        isFormValid = false;
    }

    // 4. Success Action
    if (isFormValid) {
        // Create a message object
        const newMessage = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            date: new Date().toISOString()
        };

        // Get existing messages from localStorage, or start a new array
        const existingMessages = JSON.parse(localStorage.getItem('adminMessages')) || [];
        existingMessages.push(newMessage);

        // Save back to localStorage as a string
        localStorage.setItem('adminMessages', JSON.stringify(existingMessages));

        // Show your success toast notification (simulated here with an alert)
        alert('Message sent successfully!');
        
        // Clear the form
        contactForm.reset();
    }
});