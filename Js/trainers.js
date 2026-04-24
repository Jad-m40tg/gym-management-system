const trainersData = [
    {
        id: 1,
        name: "Oussama Bin Ladin",
        specialty: "flying high",
        experience: "9/11y",
        bio: "hitting twin towers n' leanin'",
        img: "Osama_bin_Laden.png",
        fullDetails: "Detailed bio goes here. 9/11 remake ? (yes)"
    },
    {
        id: 2,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 3,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 3,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 4,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 5,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 6,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 7,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
        {
        id: 8,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    },
    // I added two to show the loop, but you can copy/paste this block to add all 8!
];

function renderTrainers(list) {
    const grid = document.getElementById('trainer-grid');
    grid.innerHTML = ''; // This clears the static HTML and drops in the JS array

    if(list.length === 0) {
        grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: white; font-family: Inter;">No team members found.</p>`;
        return;
    }

    list.forEach(trainer => {
        const card = document.createElement('article');
        card.className = 'feature-card';
        card.innerHTML = `
            <figure>
                <img src="${trainer.img}" alt="trainer pfp" width="100" height="100">
                <figcaption>
                    <h2>${trainer.name}</h2>
                </figcaption>
            </figure>
            <ul>
                <li><strong>Specialty:</strong> ${trainer.specialty}</li>
                <li><strong>Years of experience:</strong> ${trainer.experience}</li>
                <li><strong>Bio:</strong> ${trainer.bio}</li>
            </ul>
            <button class="btn" onclick="openModal(${trainer.id})">Learn more details</button>
        `;
        grid.appendChild(card);
    });
}

// Search Logic
function filterTrainers() {
    const query = document.getElementById('trainerSearch').value.toLowerCase();
    const filtered = trainersData.filter(t => 
        t.name.toLowerCase().includes(query) || 
        t.specialty.toLowerCase().includes(query)
    );
    renderTrainers(filtered);
}

// Modal Logic
function openModal(id) {
    const trainer = trainersData.find(t => t.id === id);
    const modal = document.getElementById('trainerModal');
    const dataBox = document.getElementById('modalData');

    dataBox.innerHTML = `
        <img src="${trainer.img}" style="width:110px; height:110px; object-fit:cover; border-radius:50%; border:3px solid rgb(210, 240, 90); margin-bottom:20px;">
        <h2 style="color:white; font-family: Inter; margin-bottom: 10px;">${trainer.name}</h2>
        <p style="color:rgb(210, 240, 90); margin-bottom: 20px;"><strong>${trainer.specialty}</strong> | ${trainer.experience}</p>
        <p style="color:#dcdcdc; font-family: Inter; line-height: 1.6;">${trainer.fullDetails}</p>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('trainerModal').style.display = 'none';
}

window.onkeydown = (e) => { if(e.key === "Escape") closeModal(); };
window.onclick = (e) => { if(e.target.id === 'trainerModal') closeModal(); };

// Load the dynamic array on page start
window.onload = () => renderTrainers(trainersData);