//form validator
const registration_form = document.getElementById('reg'); 
const email_input = document.getElementById('emailadr');
const name_input = document.getElementById('fname');
const phone_input = document.getElementById('phinenum');
const date_of_birth_input = document.getElementById('dob');
const terms_input = document.getElementById('terms');

// visual helper functions for the errors placeholders in html

function setError(element, errorElementId, message) {
   const errorSpan = document.getElementById(errorElementId);
    if (errorSpan) errorSpan.innerText = message;
    element.classList.add('invalid');
    element.classList.remove('valid');
}


function setSuccess(element, errorElementId) {
    const errorSpan = document.getElementById(errorElementId);
    if (errorSpan) errorSpan.innerText = '';
    element.classList.add('valid');
    element.classList.remove('invalid');
}
// a fucntion to validate the email

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'emailError', 'Enter a valid email address.');
            return false;
        } else {
            setSuccess(emailInput, 'emailError');
            return true;
        }
    }

    function validateName() {
        const nameRegex = /^[A-Za-z\s]{3,}$/; 
        if (!nameRegex.test(nameInput.value.trim())) {
            setError(nameInput, 'nameError', 'Name must be at least 3 letters.');
            return false;
        } else {
            setSuccess(nameInput, 'nameError');
            return true;
        }
    }

    function validatePhone() {
        const phoneRegex = /^[0-9]{8,15}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            setError(phoneInput, 'phoneError', 'Phone must be 8-15 digits.');
            return false;
        } else {
            setSuccess(phoneInput, 'phoneError');
            return true;
        }
    }

    function validateDob() {
        if (!dobInput.value) {
            setError(dobInput, 'dobError', 'Date of birth is required.');
            return false;
        }
        const birthDate = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 16) {
            setError(dobInput, 'dobError', 'You must be at least 16 years old.');
            return false;
        } else {
            setSuccess(dobInput, 'dobError');
            return true;
        }
    }

    function validateTerms() {
        if (!termsInput.checked) {
            document.getElementById('termsError').innerText = 'You must accept the terms.';
            return false;
        } else {
            document.getElementById('termsError').innerText = '';
            return true;
        }
    }
    // 5. Add Listeners (Real-time feedback when user clicks away)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    dobInput.addEventListener('blur', validateDob);
    termsInput.addEventListener('change', validateTerms);

    // 6. Final Submit Check
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDobValid = validateDob();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isPhoneValid && isDobValid && isTermsValid) {
            alert('Registration Successful! Welcome to the Gym.');
            form.reset();
            // Clear green borders after reset
            document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
        }
    }); 

/*function setError(element, errorElementId, message) {
        const errorSpan = document.getElementById(errorElementId);
        if (errorSpan) errorSpan.innerText = message;
        element.classList.add('invalid');
        element.classList.remove('valid');
    }

    // 3. Visual Helper: Show Success (Green border)
    function setSuccess(element, errorElementId) {
        const errorSpan = document.getElementById(errorElementId);
        if (errorSpan) errorSpan.innerText = '';
        element.classList.add('valid');
        element.classList.remove('invalid');
    }

    // 4. Individual Validation Functions
    function validateName() {
        const nameRegex = /^[A-Za-z\s]{3,}$/; 
        if (!nameRegex.test(nameInput.value.trim())) {
            setError(nameInput, 'nameError', 'Name must be at least 3 letters.');
            return false;
        } else {
            setSuccess(nameInput, 'nameError');
            return true;
        }
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput, 'emailError', 'Enter a valid email address.');
            return false;
        } else {
            setSuccess(emailInput, 'emailError');
            return true;
        }
    }

    function validatePhone() {
        const phoneRegex = /^[0-9]{8,15}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            setError(phoneInput, 'phoneError', 'Phone must be 8-15 digits.');
            return false;
        } else {
            setSuccess(phoneInput, 'phoneError');
            return true;
        }
    }

    function validateDob() {
        if (!dobInput.value) {
            setError(dobInput, 'dobError', 'Date of birth is required.');
            return false;
        }
        const birthDate = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 16) {
            setError(dobInput, 'dobError', 'You must be at least 16 years old.');
            return false;
        } else {
            setSuccess(dobInput, 'dobError');
            return true;
        }
    }

    function validateTerms() {
        if (!termsInput.checked) {
            document.getElementById('termsError').innerText = 'You must accept the terms.';
            return false;
        } else {
            document.getElementById('termsError').innerText = '';
            return true;
        }
    }

    // 5. Add Listeners (Real-time feedback when user clicks away)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    dobInput.addEventListener('blur', validateDob);
    termsInput.addEventListener('change', validateTerms);

    // 6. Final Submit Check
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDobValid = validateDob();
        const isTermsValid = validateTerms();

        if (isNameValid && isEmailValid && isPhoneValid && isDobValid && isTermsValid) {
            alert('Registration Successful! Welcome to the Gym.');
            form.reset();
            // Clear green borders after reset
            document.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'));
        }
    });
    //reciving the input from the registration form (submit)
registration_form.addEventListener('submit', (e) => {
    e.preventDefault();//to stop the page from reloading instantly
    let isregvalid = true;
    if(name_input.value.trim() < 3 ){
        document.getElementById('nameError').innerText="Name must be at least 3 characters";
        name_input.classList.add('invalid');
        isregvalid=false;
    }else{
        document.getElementById('nameError').innerText="";
        name_input.classList.add('valid');

    }
    if(!isValidEmail(email_input.value.trim())){
        console.error('Enter a valid email address');
        isregvalid=false;
    }
}); */