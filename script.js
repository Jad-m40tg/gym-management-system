/*scratching sheet for js not the actual code, will use or edit some of it when i learn it*/

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
/*claude's code*/
// ============================================
// FEATURE 1: Membership Form Validation
// ============================================

const membershipForm = document.getElementById('membership-form');
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dobInput = document.getElementById('dob');
const planRadios = document.querySelectorAll('input[name="plan"]');
const termsCheckbox = document.getElementById('terms');

// Error message elements
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const dobError = document.getElementById('dob-error');
const planError = document.getElementById('plan-error');
const termsError = document.getElementById('terms-error');

// Validation functions
function validateName() {
    const name = fullNameInput.value.trim();
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    
    if (name === '') {
        showError(fullNameInput, nameError, 'Name is required');
        return false;
    } else if (!nameRegex.test(name)) {
        showError(fullNameInput, nameError, 'Name must be at least 3 letters, letters only');
        return false;
    } else {
        showSuccess(fullNameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(emailInput, emailError, 'Please enter a valid email');
        return false;
    } else {
        showSuccess(emailInput, emailError);
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const phoneRegex = /^\d{8,15}$/;
    
    if (phone === '') {
        showError(phoneInput, phoneError, 'Phone is required');
        return false;
    } else if (!phoneRegex.test(phone)) {
        showError(phoneInput, phoneError, 'Phone must be 8-15 digits');
        return false;
    } else {
        showSuccess(phoneInput, phoneError);
        return true;
    }
}

function validateDOB() {
    const dob = dobInput.value;
    
    if (dob === '') {
        showError(dobInput, dobError, 'Date of birth is required');
        return false;
    }
    
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    const actualAge = (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) 
        ? age - 1 
        : age;
    
    if (actualAge < 16) {
        showError(dobInput, dobError, 'You must be at least 16 years old');
        return false;
    } else {
        showSuccess(dobInput, dobError);
        return true;
    }
}

function validatePlan() {
    const planSelected = Array.from(planRadios).some(radio => radio.checked);
    
    if (!planSelected) {
        planError.textContent = 'Please select a membership plan';
        planError.style.display = 'block';
        return false;
    } else {
        planError.style.display = 'none';
        return true;
    }
}

function validateTerms() {
    if (!termsCheckbox.checked) {
        termsError.textContent = 'You must accept the terms and conditions';
        termsError.style.display = 'block';
        return false;
    } else {
        termsError.style.display = 'none';
        return true;
    }
}

// Helper functions for UI feedback
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

// Real-time validation on blur
fullNameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
dobInput.addEventListener('blur', validateDOB);
planRadios.forEach(radio => radio.addEventListener('change', validatePlan));
termsCheckbox.addEventListener('change', validateTerms);

// Form submission
membershipForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Run all validations
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isDOBValid = validateDOB();
    const isPlanValid = validatePlan();
    const isTermsValid = validateTerms();
    
    // If all valid, submit
    if (isNameValid && isEmailValid && isPhoneValid && isDOBValid && isPlanValid && isTermsValid) {
        // Show success modal or message
        showSuccessModal();
        
        // In Part 4, this will actually submit to PHP
        // For now, just log the data
        console.log('Form is valid! Ready to submit.');
    }
});

function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>✓ Registration Successful!</h2>
            <p>Your membership application has been submitted.</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}
/*===validation feedback===
input.invalid {
    border: 2px solid #ff3b3b;
}

input.valid {
    border: 2px solid rgb(200, 230, 90);
}

.error-message {
    color: #ff3b3b;
    font-size: 0.9rem;
    margin-top: 0.25rem;
    display: none;
}

.success-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
}*/
// ============================================
// FEATURE 2: Classes Filter & Sort
// ============================================

/* Sample class data (in Part 4, this comes from PHP/MySQL)
const classesData = [
    {
        id: 1,
        name: 'HIIT Cardio',
        trainer: 'Mike Johnson',
        day: 'Monday',
        time: '08:00',
        duration: 60,
        difficulty: 'Advanced'
    },
    {
        id: 2,
        name: 'Yoga Flow',
        trainer: 'Sarah Lee',
        day: 'Monday',
        time: '10:00',
        duration: 45,
        difficulty: 'Beginner'
    },
    {
        id: 3,
        name: 'Strength Training',
        trainer: 'Mike Johnson',
        day: 'Wednesday',
        time: '18:00',
        duration: 90,
        difficulty: 'Intermediate'
    },
    {
        id: 4,
        name: 'Pilates',
        trainer: 'Sarah Lee',
        day: 'Friday',
        time: '09:00',
        duration: 60,
        difficulty: 'Beginner'
    }
];*/

let filteredClasses = [...classesData];
let currentSortColumn = null;
let sortAscending = true;

// Filter elements
const trainerFilter = document.getElementById('trainer-filter');
const dayFilter = document.getElementById('day-filter');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Populate trainer dropdown
function populateTrainerFilter() {
    const trainers = [...new Set(classesData.map(c => c.trainer))];
    trainerFilter.innerHTML = '<option value="all">All Trainers</option>';
    trainers.forEach(trainer => {
        const option = document.createElement('option');
        option.value = trainer;
        option.textContent = trainer;
        trainerFilter.appendChild(option);
    });
}

// Render classes table
function renderClasses(classes) {
    const tbody = document.getElementById('classes-tbody');
    
    if (classes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No classes found</td></tr>';
        return;
    }
    
    tbody.innerHTML = classes.map(classItem => `
        <tr>
            <td>${classItem.name}</td>
            <td>${classItem.trainer}</td>
            <td>${classItem.day}</td>
            <td>${classItem.time}</td>
            <td>${classItem.duration} min</td>
            <td><span class="badge badge-${classItem.difficulty.toLowerCase()}">${classItem.difficulty}</span></td>
        </tr>
    `).join('');
}

// Apply all filters
function applyFilters() {
    filteredClasses = classesData.filter(classItem => {
        const trainerMatch = trainerFilter.value === 'all' || classItem.trainer === trainerFilter.value;
        const dayMatch = dayFilter.value === 'all' || classItem.day === dayFilter.value;
        
        const activeDifficulty = document.querySelector('.difficulty-btn.active');
        const difficultyMatch = !activeDifficulty || 
            activeDifficulty.dataset.difficulty === 'all' || 
            classItem.difficulty === activeDifficulty.dataset.difficulty;
        
        return trainerMatch && dayMatch && difficultyMatch;
    });
    
    renderClasses(filteredClasses);
}

// Difficulty filter buttons
difficultyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        difficultyButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        applyFilters();
    });
});

// Dropdown filters
trainerFilter.addEventListener('change', applyFilters);
dayFilter.addEventListener('change', applyFilters);

// Sorting
document.querySelectorAll('th.sortable').forEach(header => {
    header.addEventListener('click', function() {
        const column = this.dataset.column;
        
        if (currentSortColumn === column) {
            sortAscending = !sortAscending;
        } else {
            currentSortColumn = column;
            sortAscending = true;
        }
        
        sortClasses(column);
        updateSortIndicators(this);
    });
});

function sortClasses(column) {
    filteredClasses.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];
        
        if (column === 'duration') {
            aVal = parseInt(aVal);
            bVal = parseInt(bVal);
        }
        
        if (aVal < bVal) return sortAscending ? -1 : 1;
        if (aVal > bVal) return sortAscending ? 1 : -1;
        return 0;
    });
    
    renderClasses(filteredClasses);
}

function updateSortIndicators(activeHeader) {
    document.querySelectorAll('th.sortable').forEach(h => {
        h.classList.remove('sort-asc', 'sort-desc');
    });
    
    activeHeader.classList.add(sortAscending ? 'sort-asc' : 'sort-desc');
}

// Initialize
populateTrainerFilter();
renderClasses(classesData);
// ============================================
// FEATURE 3: Plan Selection & Cart
// ============================================

const planButtons = document.querySelectorAll('.select-plan-btn');
const cartDisplay = document.getElementById('cart-display');
const proceedBtn = document.getElementById('proceed-to-register');

// Load saved plan from sessionStorage
function loadSavedPlan() {
    const savedPlan = sessionStorage.getItem('selectedPlan');
    if (savedPlan) {
        const plan = JSON.parse(savedPlan);
        updateCartDisplay(plan);
    }
}

// Select plan
planButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const planCard = this.closest('.plan-card');
        const plan = {
            id: planCard.dataset.planId,
            name: planCard.dataset.planName,
            price: planCard.dataset.planPrice
        };
        
        sessionStorage.setItem('selectedPlan', JSON.stringify(plan));
        updateCartDisplay(plan);
        
        // Visual feedback
        document.querySelectorAll('.plan-card').forEach(card => {
            card.classList.remove('selected');
        });
        planCard.classList.add('selected');
    });
});

function updateCartDisplay(plan) {
    if (!plan) {
        cartDisplay.style.display = 'none';
        return;
    }
    
    cartDisplay.style.display = 'block';
    cartDisplay.innerHTML = `
        <div class="mini-cart">
            <p>Selected Plan: <strong>${plan.name}</strong></p>
            <p>Price: <strong>$${plan.price}</strong></p>
            <button id="clear-plan">Clear Selection</button>
        </div>
    `;
    
    document.getElementById('clear-plan').addEventListener('click', clearPlan);
}

function clearPlan() {
    sessionStorage.removeItem('selectedPlan');
    updateCartDisplay(null);
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });
}

// Proceed to register
proceedBtn.addEventListener('click', function() {
    const savedPlan = sessionStorage.getItem('selectedPlan');
    if (!savedPlan) {
        alert('Please select a plan first');
        return;
    }
    
    window.location.href = 'membership.html#registration';
});

// Initialize
loadSavedPlan();
// ============================================
// FEATURE 4: Trainers Search & Modal Detail
// ============================================

const trainersData = [
    {
        id: 1,
        name: 'Mike Johnson',
        specialty: 'HIIT & Strength Training',
        experience: 8,
        photo: 'images/trainer1.jpg',
        bio: 'Mike is a certified personal trainer with 8 years of experience in high-intensity interval training and strength conditioning. He has helped over 200 clients achieve their fitness goals.',
        schedule: ['Monday 08:00 - HIIT Cardio', 'Wednesday 18:00 - Strength Training', 'Friday 07:00 - Boot Camp']
    },
    {
        id: 2,
        name: 'Sarah Lee',
        specialty: 'Yoga & Pilates',
        experience: 6,
        photo: 'images/trainer2.jpg',
        bio: 'Sarah is a certified yoga instructor and Pilates expert. Her calm and motivating teaching style helps beginners and advanced practitioners alike find balance and flexibility.',
        schedule: ['Monday 10:00 - Yoga Flow', 'Friday 09:00 - Pilates', 'Sunday 09:00 - Morning Yoga']
    },
    {
        id: 3,
        name: 'Carlos Mendez',
        specialty: 'Boxing & Cardio',
        experience: 10,
        photo: 'images/trainer3.jpg',
        bio: 'Carlos is a former professional boxer turned fitness coach. He brings discipline, technique, and passion to every class, helping members build endurance and confidence.',
        schedule: ['Tuesday 17:00 - Boxing Basics', 'Thursday 18:00 - Cardio Combat', 'Saturday 10:00 - Sparring Session']
    },
    {
        id: 4,
        name: 'Amina Rais',
        specialty: 'Nutrition & Wellness',
        experience: 5,
        photo: 'images/trainer4.jpg',
        bio: 'Amina combines fitness training with nutrition coaching to help members achieve a complete healthy lifestyle. She holds certifications in personal training and sports nutrition.',
        schedule: ['Wednesday 10:00 - Full Body Workout', 'Friday 16:00 - Core & Wellness', 'Saturday 08:00 - Stretch & Recovery']
    }
];

const searchInput = document.getElementById('trainer-search');
const trainersGrid = document.getElementById('trainers-grid');
const trainerModal = document.getElementById('trainer-modal');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');

// Render trainer cards
function renderTrainers(trainers) {
    if (trainers.length === 0) {
        trainersGrid.innerHTML = `
            <div class="no-results">
                <p>No trainers found matching your search.</p>
            </div>
        `;
        return;
    }

    trainersGrid.innerHTML = trainers.map(trainer => `
        <article class="trainer-card" data-id="${trainer.id}">
            <figure>
                <img src="${trainer.photo}" alt="${trainer.name}" onerror="this.src='images/placeholder.jpg'">
                <figcaption>${trainer.name}</figcaption>
            </figure>
            <div class="trainer-info">
                <h3>${trainer.name}</h3>
                <p class="specialty">${trainer.specialty}</p>
                <p class="experience">${trainer.experience} years experience</p>
                <button class="view-profile-btn" data-id="${trainer.id}">View Profile</button>
            </div>
        </article>
    `).join('');

    // Attach event listeners to all view profile buttons
    document.querySelectorAll('.view-profile-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const trainerId = parseInt(this.dataset.id);
            openTrainerModal(trainerId);
        });
    });
}

// Open modal with trainer details
function openTrainerModal(trainerId) {
    const trainer = trainersData.find(t => t.id === trainerId);
    if (!trainer) return;

    modalBody.innerHTML = `
        <div class="modal-trainer-header">
            <img src="${trainer.photo}" alt="${trainer.name}" onerror="this.src='images/placeholder.jpg'">
            <div class="modal-trainer-info">
                <h2>${trainer.name}</h2>
                <p class="specialty">${trainer.specialty}</p>
                <p class="experience">${trainer.experience} years of experience</p>
            </div>
        </div>
        <div class="modal-trainer-bio">
            <h3>About</h3>
            <p>${trainer.bio}</p>
        </div>
        <div class="modal-trainer-schedule">
            <h3>Class Schedule</h3>
            <ul>
                ${trainer.schedule.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
    `;

    trainerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeTrainerModal() {
    trainerModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Live search (case-insensitive)
searchInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();

    const filtered = trainersData.filter(trainer =>
        trainer.name.toLowerCase().includes(query) ||
        trainer.specialty.toLowerCase().includes(query)
    );

    renderTrainers(filtered);
});

// Close on button click
modalCloseBtn.addEventListener('click', closeTrainerModal);

// Close on outside click
trainerModal.addEventListener('click', function(e) {
    if (e.target === trainerModal) {
        closeTrainerModal();
    }
});

// Close on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && trainerModal.classList.contains('active')) {
        closeTrainerModal();
    }
});

// Initialize
renderTrainers(trainersData);
/*===css for modal===

.modal-overlay {
    display: none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    justify-content: center;
    align-items: center;
}

.modal-overlay.active {
    display: flex;
}

.modal-container {
    background: #1a1a1a;
    border: 1px solid rgb(200, 230, 90);
    border-radius: 12px;
    padding: 2rem;
    max-width: 600px;
    width: 90%;
    position: relative;
    max-height: 80vh;
    overflow-y: auto;
}

#modal-close {
    position: absolute;
    top: 1rem; right: 1rem;
    background: none;
    border: none;
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    line-height: 1;
}*/
// ============================================
// FEATURE 5: Contact Form & Feedback
// ============================================

const contactForm = document.getElementById('contact-form');
const contactNameInput = document.getElementById('contact-name');
const contactEmailInput = document.getElementById('contact-email');
const contactSubjectInput = document.getElementById('contact-subject');
const contactMessageInput = document.getElementById('contact-message');
const charCount = document.getElementById('char-count');

// Character counter for message
contactMessageInput.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = `${count} / 20 minimum`;

    if (count >= 20) {
        charCount.style.color = 'rgb(200, 230, 90)';
    } else {
        charCount.style.color = '#ff3b3b';
    }
});

// Validation helpers
function showFieldError(input, message) {
    const errorEl = document.getElementById(`${input.id}-error`);
    input.classList.add('invalid');
    input.classList.remove('valid');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function showFieldSuccess(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    input.classList.remove('invalid');
    input.classList.add('valid');
    if (errorEl) errorEl.style.display = 'none';
}

// Individual validators
function validateContactName() {
    const val = contactNameInput.value.trim();
    if (val.length < 2) {
        showFieldError(contactNameInput, 'Name must be at least 2 characters');
        return false;
    }
    showFieldSuccess(contactNameInput);
    return true;
}

function validateContactEmail() {
    const val = contactEmailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
        showFieldError(contactEmailInput, 'Please enter a valid email address');
        return false;
    }
    showFieldSuccess(contactEmailInput);
    return true;
}

function validateContactSubject() {
    const val = contactSubjectInput.value.trim();
    if (val.length < 5) {
        showFieldError(contactSubjectInput, 'Subject must be at least 5 characters');
        return false;
    }
    showFieldSuccess(contactSubjectInput);
    return true;
}

function validateContactMessage() {
    const val = contactMessageInput.value.trim();
    if (val.length < 20) {
        showFieldError(contactMessageInput, 'Message must be at least 20 characters');
        return false;
    }
    showFieldSuccess(contactMessageInput);
    return true;
}

// Real-time validation on blur
contactNameInput.addEventListener('blur', validateContactName);
contactEmailInput.addEventListener('blur', validateContactEmail);
contactSubjectInput.addEventListener('blur', validateContactSubject);
contactMessageInput.addEventListener('blur', validateContactMessage);

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('toast-show'), 10);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Save message to localStorage (simulated backend)
function saveMessageToLocalStorage(data) {
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push({
        id: Date.now(),
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        submittedAt: new Date().toLocaleString(),
        read: false
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

// Form submit
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isNameValid = validateContactName();
    const isEmailValid = validateContactEmail();
    const isSubjectValid = validateContactSubject();
    const isMessageValid = validateContactMessage();

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        const formData = {
            name: contactNameInput.value.trim(),
            email: contactEmailInput.value.trim(),
            subject: contactSubjectInput.value.trim(),
            message: contactMessageInput.value.trim()
        };

        saveMessageToLocalStorage(formData);
        showToast('✓ Message sent successfully! We will get back to you soon.');
        contactForm.reset();
        charCount.textContent = '0 / 20 minimum';
        charCount.style.color = '#ff3b3b';

        // Remove valid classes after reset
        [contactNameInput, contactEmailInput, contactSubjectInput, contactMessageInput]
            .forEach(input => input.classList.remove('valid', 'invalid'));
    }
});
/*==css for toast==*
.toast {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: rgb(200, 230, 90);
    color: #000;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transform: translateX(200%);
    transition: transform 0.4s ease;
    z-index: 9999;
    max-width: 350px;
}

.toast.toast-show {
    transform: translateX(0);
}*/

// ============================================
// ADMIN FEATURE 1: Member Management CRUD
// ============================================

// Pre-seed localStorage with 5 sample members
function seedMembers() {
    if (!localStorage.getItem('gymMembers')) {
        const sampleMembers = [
            { id: 1, name: 'John Smith', email: 'john@email.com', phone: '0551234567', plan: 'Gold', joinDate: '2025-01-15', status: 'active' },
            { id: 2, name: 'Fatima Zara', email: 'fatima@email.com', phone: '0667891234', plan: 'Silver', joinDate: '2025-02-01', status: 'active' },
            { id: 3, name: 'Rayan Bouali', email: 'rayan@email.com', phone: '0773456789', plan: 'Bronze', joinDate: '2025-01-20', status: 'active' },
            { id: 4, name: 'Nour Amine', email: 'nour@email.com', phone: '0559876543', plan: 'Gold', joinDate: '2024-12-10', status: 'active' },
            { id: 5, name: 'Karim Bensalem', email: 'karim@email.com', phone: '0661234598', plan: 'Silver', joinDate: '2025-03-01', status: 'active' }
        ];
        localStorage.setItem('gymMembers', JSON.stringify(sampleMembers));
    }
}

// Get members
function getMembers() {
    return JSON.parse(localStorage.getItem('gymMembers')) || [];
}

// Save members
function saveMembers(members) {
    localStorage.setItem('gymMembers', JSON.stringify(members));
}

// Generate unique ID
function generateId() {
    return Date.now();
}

// Render members table
function renderMembersTable(filter = 'all', searchQuery = '') {
    let members = getMembers();

    // Filter by plan
    if (filter !== 'all') {
        members = members.filter(m => m.plan.toLowerCase() === filter.toLowerCase());
    }

    // Filter by search
    if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        members = members.filter(m =>
            m.name.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q)
        );
    }

    // Update member count
    document.getElementById('member-count').textContent = `Total: ${members.length} member(s)`;

    const tbody = document.getElementById('members-tbody');

    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">No members found</td></tr>';
        return;
    }

    tbody.innerHTML = members.map(member => `
        <tr>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.phone}</td>
            <td><span class="plan-badge plan-${member.plan.toLowerCase()}">${member.plan}</span></td>
            <td>${member.joinDate}</td>
            <td><span class="status-badge status-${member.status}">${member.status}</span></td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="openEditModal(${member.id})">Edit</button>
                <button class="btn-delete" onclick="deleteMember(${member.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Add member
const addMemberForm = document.getElementById('add-member-form');
addMemberForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const newMember = {
        id: generateId(),
        name: document.getElementById('member-name').value.trim(),
        email: document.getElementById('member-email').value.trim(),
        phone: document.getElementById('member-phone').value.trim(),
        plan: document.getElementById('member-plan').value,
        joinDate: document.getElementById('member-join-date').value,
        status: 'active'
    };

    const members = getMembers();
    members.push(newMember);
    saveMembers(members);

    addMemberForm.reset();
    renderMembersTable();
    updateDashboardStats();
    showToast('Member added successfully!');
});

// Delete member
function deleteMember(id) {
    const confirmed = confirm('Are you sure you want to delete this member?');
    if (!confirmed) return;

    let members = getMembers();
    members = members.filter(m => m.id !== id);
    saveMembers(members);
    renderMembersTable();
    updateDashboardStats();
    showToast('Member deleted.', 'error');
}

// Open edit modal
function openEditModal(id) {
    const members = getMembers();
    const member = members.find(m => m.id === id);
    if (!member) return;

    document.getElementById('edit-member-id').value = member.id;
    document.getElementById('edit-member-name').value = member.name;
    document.getElementById('edit-member-email').value = member.email;
    document.getElementById('edit-member-phone').value = member.phone;
    document.getElementById('edit-member-plan').value = member.plan;
    document.getElementById('edit-member-join-date').value = member.joinDate;

    document.getElementById('edit-member-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Save edit
const editMemberForm = document.getElementById('edit-member-form');
editMemberForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('edit-member-id').value);
    let members = getMembers();
    const index = members.findIndex(m => m.id === id);

    if (index !== -1) {
        members[index] = {
            ...members[index],
            name: document.getElementById('edit-member-name').value.trim(),
            email: document.getElementById('edit-member-email').value.trim(),
            phone: document.getElementById('edit-member-phone').value.trim(),
            plan: document.getElementById('edit-member-plan').value,
            joinDate: document.getElementById('edit-member-join-date').value
        };

        saveMembers(members);
        closeEditModal();
        renderMembersTable();
        updateDashboardStats();
        showToast('Member updated successfully!');
    }
});

function closeEditModal() {
    document.getElementById('edit-member-modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Search input listener
document.getElementById('member-search').addEventListener('input', function() {
    const activeFilter = document.querySelector('.plan-filter-btn.active')?.dataset.plan || 'all';
    renderMembersTable(activeFilter, this.value);
});

// Plan filter buttons
document.querySelectorAll('.plan-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.plan-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const searchQuery = document.getElementById('member-search').value;
        renderMembersTable(this.dataset.plan, searchQuery);
    });
});

// Close edit modal on outside click
document.getElementById('edit-member-modal').addEventListener('click', function(e) {
    if (e.target === this) closeEditModal();
});

// Initialize
seedMembers();
renderMembersTable();
// ============================================
// ADMIN FEATURE 2: Class Schedule Manager
// ============================================

function getAdminClasses() {
    // Seed with initial classes if empty
    if (!localStorage.getItem('gymClasses')) {
        const defaultClasses = [
            { id: 1, name: 'HIIT Cardio', trainer: 'Mike Johnson', day: 'Monday', time: '08:00', duration: 60, difficulty: 'Advanced', capacity: 20 },
            { id: 2, name: 'Yoga Flow', trainer: 'Sarah Lee', day: 'Monday', time: '10:00', duration: 45, difficulty: 'Beginner', capacity: 15 },
            { id: 3, name: 'Strength Training', trainer: 'Mike Johnson', day: 'Wednesday', time: '18:00', duration: 90, difficulty: 'Intermediate', capacity: 12 }
        ];
        localStorage.setItem('gymClasses', JSON.stringify(defaultClasses));
    }
    return JSON.parse(localStorage.getItem('gymClasses')) || [];
}

function saveAdminClasses(classes) {
    localStorage.setItem('gymClasses', JSON.stringify(classes));
}

// Render classes in admin table
function renderAdminClassesTable() {
    const classes = getAdminClasses();
    const tbody = document.getElementById('admin-classes-tbody');

    if (classes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8">No classes found</td></tr>';
        return;
    }

    tbody.innerHTML = classes.map(cls => `
        <tr>
            <td>${cls.name}</td>
            <td>${cls.trainer}</td>
            <td>${cls.day}</td>
            <td>${cls.time}</td>
            <td>${cls.duration} min</td>
            <td>${cls.difficulty}</td>
            <td>${cls.capacity}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="openEditClassModal(${cls.id})">Edit</button>
                <button class="btn-delete" onclick="deleteClass(${cls.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Check for duplicate class (same trainer, same day, same time)
function isDuplicateClass(trainer, day, time, excludeId = null) {
    const classes = getAdminClasses();
    return classes.some(cls =>
        cls.trainer === trainer &&
        cls.day === day &&
        cls.time === time &&
        cls.id !== excludeId
    );
}

// Add new class
const addClassForm = document.getElementById('add-class-form');
addClassForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const trainer = document.getElementById('class-trainer').value.trim();
    const day = document.getElementById('class-day').value;
    const time = document.getElementById('class-time').value;

    // Check for duplicate
    if (isDuplicateClass(trainer, day, time)) {
        showToast('This trainer already has a class on that day and time!', 'error');
        return;
    }

    const newClass = {
        id: generateId(),
        name: document.getElementById('class-name').value.trim(),
        trainer: trainer,
        day: day,
        time: time,
        duration: parseInt(document.getElementById('class-duration').value),
        difficulty: document.getElementById('class-difficulty').value,
        capacity: parseInt(document.getElementById('class-capacity').value)
    };

    const classes = getAdminClasses();
    classes.push(newClass);
    saveAdminClasses(classes);

    addClassForm.reset();
    renderAdminClassesTable();
    updateDashboardStats();
    showToast('Class added successfully!');
});

// Delete class
function deleteClass(id) {
    const confirmed = confirm('Are you sure you want to delete this class?');
    if (!confirmed) return;

    let classes = getAdminClasses();
    classes = classes.filter(c => c.id !== id);
    saveAdminClasses(classes);
    renderAdminClassesTable();
    updateDashboardStats();
    showToast('Class deleted.', 'error');
}

// Open edit class modal
function openEditClassModal(id) {
    const classes = getAdminClasses();
    const cls = classes.find(c => c.id === id);
    if (!cls) return;

    document.getElementById('edit-class-id').value = cls.id;
    document.getElementById('edit-class-name').value = cls.name;
    document.getElementById('edit-class-trainer').value = cls.trainer;
    document.getElementById('edit-class-day').value = cls.day;
    document.getElementById('edit-class-time').value = cls.time;
    document.getElementById('edit-class-duration').value = cls.duration;
    document.getElementById('edit-class-difficulty').value = cls.difficulty;
    document.getElementById('edit-class-capacity').value = cls.capacity;

    document.getElementById('edit-class-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Save edited class
const editClassForm = document.getElementById('edit-class-form');
editClassForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('edit-class-id').value);
    const trainer = document.getElementById('edit-class-trainer').value.trim();
    const day = document.getElementById('edit-class-day').value;
    const time = document.getElementById('edit-class-time').value;

    // Check for duplicate (excluding current class)
    if (isDuplicateClass(trainer, day, time, id)) {
        showToast('This trainer already has a class on that day and time!', 'error');
        return;
    }

    let classes = getAdminClasses();
    const index = classes.findIndex(c => c.id === id);

    if (index !== -1) {
        classes[index] = {
            ...classes[index],
            name: document.getElementById('edit-class-name').value.trim(),
            trainer: trainer,
            day: day,
            time: time,
            duration: parseInt(document.getElementById('edit-class-duration').value),
            difficulty: document.getElementById('edit-class-difficulty').value,
            capacity: parseInt(document.getElementById('edit-class-capacity').value)
        };

        saveAdminClasses(classes);
        closeEditClassModal();
        renderAdminClassesTable();
        showToast('Class updated successfully!');
    }
});

function closeEditClassModal() {
    document.getElementById('edit-class-modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('edit-class-modal').addEventListener('click', function(e) {
    if (e.target === this) closeEditClassModal();
});

// Initialize
renderAdminClassesTable();
// ============================================
// ADMIN FEATURE 3: Dashboard Dynamic Stats
// ============================================

function updateDashboardStats() {
    const members = getMembers();
    const classes = getAdminClasses();

    // Total members
    const totalMembers = members.length;

    // Active subscriptions (all active members)
    const activeSubscriptions = members.filter(m => m.status === 'active').length;

    // Classes per week (total classes in schedule)
    const classesPerWeek = classes.length;

    // Most popular plan
    const planCounts = { Bronze: 0, Silver: 0, Gold: 0 };
    members.forEach(m => {
        if (planCounts.hasOwnProperty(m.plan)) {
            planCounts[m.plan]++;
        }
    });
    const mostPopularPlan = Object.entries(planCounts).sort((a, b) => b[1] - a[1])[0][0];

    // Update DOM
    document.getElementById('stat-total-members').textContent = totalMembers;
    document.getElementById('stat-active-subs').textContent = activeSubscriptions;
    document.getElementById('stat-classes-week').textContent = classesPerWeek;
    document.getElementById('stat-popular-plan').textContent = mostPopularPlan;

    // Render CSS bar chart
    renderMemberChart(planCounts);
}

// Simple CSS bar chart (no libraries - as required)
function renderMemberChart(planCounts) {
    const chartContainer = document.getElementById('member-chart');
    if (!chartContainer) return;

    const total = Object.values(planCounts).reduce((a, b) => a + b, 0);

    chartContainer.innerHTML = Object.entries(planCounts).map(([plan, count]) => {
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
        return `
            <div class="chart-bar-group">
                <span class="chart-label">${plan}</span>
                <div class="chart-bar-track">
                    <div class="chart-bar chart-bar-${plan.toLowerCase()}" 
                         style="width: ${percentage}%"
                         data-value="${count}">
                    </div>
                </div>
                <span class="chart-value">${count} (${percentage}%)</span>
            </div>
        `;
    }).join('');
}

// CSS for bar chart:
/*
.chart-bar-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.chart-label {
    width: 70px;
    font-weight: 600;
}

.chart-bar-track {
    flex: 1;
    background: #2a2a2a;
    border-radius: 4px;
    height: 28px;
    overflow: hidden;
}

.chart-bar {
    height: 100%;
    border-radius: 4px;
    transition: width 0.6s ease;
    position: relative;
}

.chart-bar-bronze { background: #cd7f32; }
.chart-bar-silver { background: #c0c0c0; }
.chart-bar-gold   { background: rgb(200, 230, 90); }

.chart-value {
    width: 80px;
    font-size: 0.9rem;
    color: #aaa;
}
*/

// Initialize dashboard
updateDashboardStats();
// ============================================
// SHARED: Toast Notification (reuse everywhere)
// ============================================

function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('toast-show'), 10);
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}
//=====MY OWN CODE====//
