// Function to calculate percentage and save score
function calculatePercentage() {
    const tasksCompleted = {
        'A': parseInt(document.getElementById('categoryACompleted').value),
        'B': parseInt(document.getElementById('categoryBCompleted').value),
        'C': parseInt(document.getElementById('categoryCCompleted').value)
    };
    const totalTasks = {
        'A': parseInt(document.getElementById('categoryATotal').value),
        'B': parseInt(document.getElementById('categoryBTotal').value),
        'C': parseInt(document.getElementById('categoryCTotal').value)
    };

    const weights = { 'A': 3, 'B': 2, 'C': 1 };
    let totalScore = 0;
    let totalPossibleScore = 0;

    for (const category in tasksCompleted) {
        const count = tasksCompleted[category];
        totalScore += weights[category] * count;
        totalPossibleScore += weights[category] * totalTasks[category];
    }

    const percentage = (totalScore / totalPossibleScore) * 100;
    document.getElementById('result').textContent = `Your Score: ${percentage.toFixed(2)}%`;

    // Get the current date in dd/mm/yyyy format
    const currentDate = getCurrentDate();

    // Save the calculated score
    saveScore(currentDate, percentage.toFixed(2));

    // Save the input values as a note
    saveInputValuesAsNote(currentDate, tasksCompleted, totalTasks);
}

// Function to save the input values as a note
function saveInputValuesAsNote(tasksCompleted, totalTasks) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const currentDate = dd + '/' + mm + '/' + yyyy;

    const noteTitle = document.getElementById('result').textContent; // Use the calculated score as the note title
    const noteContent = `Total class A Frogs: ${totalTasks['A']}, Class A Frog eaten: ${tasksCompleted['A']}, Total class B Frogs: ${totalTasks['B']}, Class B Frog eaten: ${tasksCompleted['B']}, Total class C Frogs: ${totalTasks['C']}, Class C Frog eaten: ${tasksCompleted['C']}`;

    // Add date to the title in brackets
    const titleWithDate = `${noteTitle} (Date: ${currentDate})`;

    // Retrieve existing notes from local storage
    let savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Check if a note already exists for the current date
    const existingNoteIndex = savedNotes.findIndex(note => note.date === currentDate);

    if (existingNoteIndex !== -1) {
        // If a note already exists for the current date, update its content
        savedNotes[existingNoteIndex].title = titleWithDate;
        savedNotes[existingNoteIndex].content = noteContent;
    } else {
        // If no note exists for the current date, add a new note
        const newNote = { title: titleWithDate, content: noteContent, date: currentDate };
        savedNotes.push(newNote);
    }

    // Save the updated notes to local storage
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    // Reload notes
    loadNotes();
}
// Function to get the current date in dd/mm/yyyy format
function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

// Save calculated score to local storage
function saveScore(date, score) {
    // Check if the score is more than 100%
    if (parseFloat(score) > 100) {
        // console.log('Score cannot be more than 100%.');
        return; // Exit the function if the score is invalid
    }

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

    // Save the updated scores
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Retrieve saved scores from local storage
function getDailyScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    return scores;
}

// Function to retrieve saved scores from the past 7 days
function getPastSevenDaysScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Calculate date 7 days ago

    // Filter scores for the past 7 days
    const pastSevenDaysScores = scores.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= sevenDaysAgo && entryDate <= currentDate;
    });

    return pastSevenDaysScores;
}

// Function to calculate average score of past 7 days
function calculateAverageScore() {
    const pastSevenDaysScores = getPastSevenDaysScores();
    const totalScores = pastSevenDaysScores.reduce((total, entry) => total + parseFloat(entry.score), 0);
    const averageScore = totalScores / pastSevenDaysScores.length;

    return averageScore.toFixed(2); // Return average score rounded to 2 decimal places
}

// JavaScript for side slider menu
document.querySelector('.navbar-toggler').addEventListener('click', function () {
    document.querySelector('.navbar-collapse').classList.toggle('show');
});
