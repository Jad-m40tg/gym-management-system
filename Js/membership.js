// --- DOM Elements: Form ---

const membershipForm = document.getElementById('reg'); 
const fullNameInput = document.getElementById('fname'); 
const emailInput = document.getElementById('emailadrs'); 
const phoneInput = document.getElementById('phonenum'); 
const dobInput = document.getElementById('dob');
const planRadios = document.querySelectorAll('input[name="plan"]');
const termsCheckbox = document.getElementById('terms');

// --- DOM Elements: Error Spans ---

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const dobError = document.getElementById('dobError');
const planError = document.getElementById('planError');
const termsError = document.getElementById('termsError');

// ============================================
// PART 1: Plan Selection & Session Storage
// ============================================

// Since your "Join Now" buttons are inside <a> tags, 
// we will intercept the click to save the plan choice
document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Find the card container
        const card = this.closest('.pricing-card');
        const planName = card.querySelector('h2').textContent.split(' ')[0].toLowerCase(); // "bronze", "silver", etc.
        const planPrice = card.querySelector('.price').textContent;

        const planData = {
            name: planName,
            price: planPrice
        };

        // Save to session so the form knows what was picked
        sessionStorage.setItem('selectedPlan', JSON.stringify(planData));
    });
});

// Run this when the page loads to sync the form with the choice
function syncSelectedPlan() {
    const savedPlan = sessionStorage.getItem('selectedPlan');
    if (savedPlan) {
        const plan = JSON.parse(savedPlan);
        const targetRadio = document.querySelector(`input[name="plan"][value="${plan.name}"]`);
        if (targetRadio) {
            targetRadio.checked = true;
        }
    }
}

// ============================================
// PART 2: Form Validation Logic
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
    const name = fullNameInput.value.trim();
    if(name === "") return showError(fullNameInput, nameError, 'Full name is required'), false;
    else if (name.length < 3) return showError(fullNameInput, nameError, 'Name must be at least 3 characters'), false;
    return showSuccess(fullNameInput, nameError), true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === "") return showError(emailInput, emailError, 'Email address is required'), false;
    else if (!emailRegex.test(email)) return showError(emailInput, emailError, 'Please enter a valid email'), false;
    return showSuccess(emailInput, emailError), true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{8,15}$/;
// 1. Check if it's empty
    if (phone === "") return showError(phoneInput, phoneError, 'Phone number is required'), false;
    // 2. Check if the format is wrong
    else if (!phoneRegex.test(phone)) return showError(phoneInput, phoneError, 'Phone must be 8-15 digits'), false;
    // 3. Only show success if both checks pass
    return showSuccess(phoneInput, phoneError), true;
}

function validateDOB() {
    const dob = dobInput.value;
    if (!dob) return showError(dobInput, dobError, 'Date of birth is required'), false;
    
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
    
    if (age < 16) return showError(dobInput, dobError, 'Must be at least 16 years old'), false;
    return showSuccess(dobInput, dobError), true;
}

// ============================================
// PART 3: Event Listeners
// ============================================

// Real-time validation
fullNameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);
dobInput.addEventListener('change', validateDOB);

// Form Submission
membershipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDOBValid = validateDOB();
    const isTermsValid = termsCheckbox.checked;
    // getting the modal elements
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');
    const userNameSpan = document.getElementById('userName');
    if (!isTermsValid) {
        termsError.textContent = "You must agree to the terms";
        termsError.style.display = "block";
    } else {
        termsError.style.display = "none";
    }

    if (isNameValid && isEmailValid && isPhoneValid && isDOBValid && isTermsValid) {
        // 1. Set the name in the modal
        userNameSpan.textContent = fullNameInput.value;   
        // 2. Show the modal
        modal.style.display = 'flex';
        sessionStorage.removeItem('selectedPlan');
        membershipForm.reset();
        // Remove the 'valid' green borders after reset
        document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
    }
    // Close button logic
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
});

// Initialize
syncSelectedPlan();