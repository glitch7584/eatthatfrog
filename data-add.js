// Function to handle form submission
document.getElementById('addScoreForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Get input values
    const date = document.getElementById('dateInput').value;
    const score = parseFloat(document.getElementById('scoreInput').value);

    // Validate input values
    if (!date || isNaN(score)) {
        alert('Please fill in all fields and make sure the score is a valid number.');
        return;
    }

    // Check if score is greater than 100
    if (score > 100) {
        alert('Score cannot be greater than 100.');
        return;
    }

    // Save data to local storage
    saveScore(formatDate(date), score);

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    setTimeout(function () {
        successMessage.style.display = 'none';
    }, 3000);

    // Reset form fields
    document.getElementById('dateInput').value = '';
    document.getElementById('scoreInput').value = '';
});

// Function to save score to local storage
function saveScore(date, score) {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    // Check if a score already exists for the current date
    const existingScoreIndex = scores.findIndex(entry => entry.date === date);

    if (existingScoreIndex !== -1) {
        // Update the existing score
        scores[existingScoreIndex].score = score;
    } else {
        // Add the new score
        scores.push({ date, score });
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

// Function to format date as dd/mm/yyyy
function formatDate(dateString) {
    const parts = dateString.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

// JavaScript for side slider menu
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    document.querySelector('.navbar-collapse').classList.toggle('show');
});
