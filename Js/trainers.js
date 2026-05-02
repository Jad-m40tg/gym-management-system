const trainersData = [
    {
        id: 1,
        name: "a cat trainer",
        specialty: "napping",
        experience: "1y",
        bio: "meow",
        img: "idiotcat.png",
        fullDetails: "lol"
    },
    {
        id: 2,
        name: "Baki Hanma",
        specialty: "HIIT Training",
        experience: "5y",
        bio: "High-intensity specialist focused on explosive power and endurance.",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "Baki specializes in metabolic conditioning and plyometrics. His \"no-limit\" approach is designed for those looking to break through physical plateaus."
    },
        {
        id: 3,
        name: "Lara Croft",
        specialty: "Yoga Flow",
        experience: "4y",
        bio: "World-class explorer focusing on agility, endurance, and precision.",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "Draws from years of field experience. Her \"Yoga Flow\" focuses on functional mobility and the core strength required to navigate any environment."
    },
        {
        id: 4,
        name: "Chris Redfield",
        specialty: "Strength Training",
        experience: "6y",
        bio: "Tactical strength veteran. Expert in heavy-duty resistance training.",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "Former special operations trainer. He prioritizes structural integrity and high-volume lifting to build a frame capable of handling any crisis."
    },
        {
        id: 5,
        name: "Marc Spector",
        specialty: "Boxing Conditioning",
        experience: "4y",
        bio: "Multi-disciplined combat expert specializing in high-stakes conditioning.",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "Combines boxing, savate, and street-fighting techniques. His sessions are high-intensity and focus on split-second reaction times and mental focus."
    },
        {
        id: 6,
        name: "Sarah Connor",
        specialty: "Pilates Core",
        experience: "3y",
        bio: "Survivalist coach focused on functional core and mental resilience.",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "Specializes in high-intensity survival training. Her Pilates Core sessions are designed to build a body that is as lean and efficient as it is durable."
    },
        {
        id: 7,
        name: "Alex Mercer",
        specialty: "Functional Training",
        experience: "7y",
        bio: "Biological mobility expert. Focuses on total-body adaptability.",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "Focuses on shifting body weight and parkour-style movements. His classes teach you how to treat your environment as your personal training ground.More details about this coach here."
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
        {
        id: 9,
        name: "Coache's Name",
        specialty: "something",
        experience: "0y",
        bio: "a quote",
        img: "anomymous_trainer_pfp.jpg",
        fullDetails: "More details about this coach here."
    }

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