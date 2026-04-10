//form validator
const email_input = document.getElementById('emailadr');
const name_input = document.getElementById('fname');
const phone_input = document.getElementById('phinenum');
const date_of_birth_input = document.getElementById('dob');
const plan_selected = document.getElementById('planselect');
const registration_form = document.getElementById('reg'); 
// a fucntion to validate the email
const isValidEmail = (email_input) => {
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email_regex.test(email_input)){
        return true;
    }else{
        return false;
    }
};
//reciving the input from the registration form
registration_form.addEventListener('submit', (e) => {
    e.preventDefault();//to stop the page from reloading instantly
    let isregvalid = true;
    if(name_input.value.trim() < 3 ){
        console.error('name must be at least 3 characters');
        isregvalid=false;
    }
    if(!isValidEmail(email_input.value.trim())){
        console.error('Enter a valid email address');
        isregvalid=false;
    }
}); 
