document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements: Form ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // --- DOM Elements: Error Spans ---
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // ============================================
    // PART 1: Validation Logic Functions
    // ============================================

    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function showSuccess(input, errorElement) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.style.display = 'none';
    }

    function validateName() {
        const name = nameInput.value.trim();
        if (name.length < 3) {
            showError(nameInput, nameError, 'Name must be at least 3 characters.');
            return false;
        }
        showSuccess(nameInput, nameError);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(emailInput, emailError, 'Please enter a valid email address.');
            return false;
        }
        showSuccess(emailInput, emailError);
        return true;
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject.length < 5) {
            showError(subjectInput, subjectError, 'Subject must be at least 5 characters.');
            return false;
        }
        showSuccess(subjectInput, subjectError);
        return true;
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message.length < 20) {
            showError(messageInput, messageError, 'Message must be at least 20 characters.');
            return false;
        }
        showSuccess(messageInput, messageError);
        return true;
    }

    // ============================================
    // PART 2: Event Listeners (Real-Time Checking)
    // ============================================

    if (contactForm) {
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        subjectInput.addEventListener('input', validateSubject);
        messageInput.addEventListener('input', validateMessage);

        // ============================================
        // PART 3: Form Submission
        // ============================================
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page refresh

            // Run all validations on submit
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isSubjectValid = validateSubject();
            const isMessageValid = validateMessage();

            // If everything is true, proceed
            if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
                alert(`Thank you, ${nameInput.value}! Your message has been sent successfully.`);
                
                // Reset form and remove green borders
                contactForm.reset();
                document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
            }
        });
    }
});