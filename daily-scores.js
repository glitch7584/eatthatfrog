// Function to retrieve daily scores from local storage
function getDailyScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    return scores;
}

// Update daily scores in the HTML
function updateDailyScores() {
    const dailyScores = getDailyScores();
    const dailyScoresContainer = document.getElementById('dailyScores');
    dailyScoresContainer.innerHTML = '';

    if (dailyScores.length === 0) {
        const noDataText = document.createElement('p');
        noDataText.textContent = 'No data to show';
        noDataText.classList.add('no-data-text');
        dailyScoresContainer.appendChild(noDataText);
    } else {
        dailyScores.forEach(score => {
            const scoreElement = document.createElement('a');
            scoreElement.classList.add('list-group-item', 'list-group-item-action');
            scoreElement.textContent = `Date: ${score.date}, Score: ${score.score}`;
            dailyScoresContainer.appendChild(scoreElement);
        });

        // Calculate and display average score if there is data available for the past 7 days
        const averageScore = calculateAverageScore();
        if (!isNaN(averageScore)) {
            const averageScoreContainer = document.getElementById('averageScoreContainer');
            averageScoreContainer.innerHTML = `Average Score of Past 7 Days: ${averageScore}%`;
        }
    }
}

// Call updateDailyScores function to display daily scores when page loads
updateDailyScores();

// Chart.js
const scores = getDailyScores();
const dates = scores.map(score => score.date);
const scoreValues = scores.map(score => score.score);

if (scores.length > 0) {
    const ctx = document.getElementById('scoreChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Score',
                data: scoreValues,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Score'
                    }
                }
            }
        }
    });
} else {
    const scoreChartContainer = document.getElementById('scoreChart');
    scoreChartContainer.textContent = 'No data to show';
    scoreChartContainer.classList.add('no-data-text');
}

// Function to calculate average score of past 7 days
function calculateAverageScore() {
    const pastSevenDaysScores = getPastSevenDaysScores();
    if (pastSevenDaysScores.length === 0) return NaN; // Return NaN if there are no scores for the past 7 days

    const totalScores = pastSevenDaysScores.reduce((total, entry) => total + parseFloat(entry.score), 0);
    const averageScore = totalScores / pastSevenDaysScores.length;

    return averageScore.toFixed(2); // Return average score rounded to 2 decimal places
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