const gymClasses = [
    { name: "HIIT Training", trainer: "Baki", day: "Monday", time: "18:00", duration: "45 min", difficulty: "Advanced" },
    { name: "Yoga Flow", trainer: "Lara", day: "Tuesday", time: "10:00", duration: "60 min", difficulty: "Beginner" },
    { name: "Strength Training", trainer: "Chris", day: "Wednesday", time: "17:30", duration: "60 min", difficulty: "Intermediate" },
    { name: "Boxing Conditioning", trainer: "Marc", day: "Thursday", time: "19:00", duration: "50 min", difficulty: "Advanced" },
    { name: "Pilates Core", trainer: "Sarah", day: "Friday", time: "11:00", duration: "45 min", difficulty: "Beginner" },
    { name: "Functional Training", trainer: "Alex", day: "Saturday", time: "16:00", duration: "60 min", difficulty: "Intermediate" }
];
let currentSort = { column: null, direction: 'asc' };
// 2. Render table rows dynamically using DOM manipulation
function renderTable(data) {
    const tableBody = document.getElementById('class-table-body');
    tableBody.innerHTML = ''; // Clear current rows

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#">${item.name}</a></td>
            <td><b>${item.trainer}</b></td>
            <td>${item.day}</td>
            <td>${item.time}</td>
            <td>${item.duration}</td>
            <td>${item.difficulty}</td>
        `;
        tableBody.appendChild(row);
    });
}

// 3. Sorting Logic
function setSort(column) {
    if (currentSort.column === column) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
        currentSort.column = column;
        currentSort.direction = 'asc';
    }
    sortAndFilter();
}

// 4. Combined Filtering & Sorting
function sortAndFilter() {
    const searchTerm = document.getElementById('classSearch').value.toLowerCase();
    const difficulty = document.getElementById('difficultyFilter').value.toLowerCase();

    // Filter
    let filtered = gymClasses.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm) || c.trainer.toLowerCase().includes(searchTerm);
        const matchesDiff = difficulty === 'all' || c.difficulty.toLowerCase() === difficulty;
        return matchesSearch && matchesDiff;
    });

    // Sort
    if (currentSort.column) {
        filtered.sort((a, b) => {
            let valA = a[currentSort.column].toLowerCase();
            let valB = b[currentSort.column].toLowerCase();
            
            if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
            if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    renderTable(filtered);
    updateSortIndicators();
}

function updateSortIndicators() {
    // Optional: Update the ▲/▼ icons in the headers
    ['name', 'trainer', 'difficulty'].forEach(col => {
        const span = document.getElementById(`sort-${col}`);
        if (currentSort.column === col) {
            span.innerHTML = currentSort.direction === 'asc' ? ' ▲' : ' ▼';
        } else {
            span.innerHTML = '';
        }
    });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => renderTable(gymClasses));