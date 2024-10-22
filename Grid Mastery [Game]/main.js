// Create grid items
for (let i = 0; i < 49; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridItem.onclick = function () { askQuestion(gridItem, i); };
    document.querySelector('.grid-container').appendChild(gridItem);
}

let currentBlock;
let currentIndex;
let solvedBlocks = 0; // Track how many blocks have been solved

// Retrieve remaining time from localStorage or set it to 30 seconds
<<<<<<< HEAD
=======
let timeRemaining = localStorage.getItem('timeRemaining') !== null 
    ? parseInt(localStorage.getItem('timeRemaining')) 
    : 30 * 60; // 30 seconds

if (isNaN(timeRemaining)) {
    timeRemaining = 30 * 60; // Reset to 30 seconds if invalid value is retrieved
}
>>>>>>> d170c7db0908450ce76e0100a74e94e23e694f93

function askQuestion(block, index) {
    currentBlock = block;
    currentIndex = index;
    const question = questions[index]?.question || "No question defined for this block.";
    document.getElementById('questionText').innerText = question;
    document.getElementById('answerInput').value = ''; // Clear input
    showModal();
}

function showModal() {
    document.getElementById('questionModal').style.display = 'flex';
}

function hideModal() {
    document.getElementById('questionModal').style.display = 'none';
}

function submitAnswer() {
    const userInput = document.getElementById('answerInput').value;
    const modal = document.getElementById('questionModal');

    if (userInput === questions[currentIndex]?.answer) {
        revealImage(currentBlock);
        solvedBlocks++; // Increment solved blocks count
        hideModal();
    } else {
        modal.classList.add('vibrate');
        setTimeout(() => {
            modal.classList.remove('vibrate');
            hideModal();
        }, 1000);
    }
}

function revealImage(block) {
    block.classList.add('revealed');
}

function showScore() {
    document.getElementById('scoreDisplay').innerText = solvedBlocks;
    document.getElementById('scoreModal').style.display = 'flex';
}

<<<<<<< HEAD


=======
function restartGame() {
    clearInterval(timerInterval); // Stop the current timer
    localStorage.removeItem('timeRemaining');
    timeRemaining = 30 * 60; // Reset timer to 30 seconds
    solvedBlocks = 0; // Reset solved blocks count
    document.getElementById('timer').innerText = '30:00'; // Reset the timer display
    document.getElementById('scoreModal').style.display = 'none'; // Hide the score modal
    timerStarted = false; // Allow the timer to restart
    resetGrid(); // Reset the grid items
}

function resetGrid() {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.classList.remove('revealed'); // Reset any revealed states
    });
}

// Function to reset the timer manually
function resetTimer() {
    clearInterval(timerInterval); // Stop the current timer
    timeRemaining = 30 * 60; // Reset timer to 30 seconds
    localStorage.setItem('timeRemaining', timeRemaining); // Update localStorage
    document.getElementById('timer').innerText = '30:00'; // Update the UI
    resetGrid(); // Reset grid when the timer is reset
    startTimer(); // Restart the timer
    timerStarted = true; // Mark the timer as started
}

window.onclick = function (event) {
    const modal = document.getElementById('questionModal');
    if (event.target === modal) {
        hideModal();
    }
};
>>>>>>> d170c7db0908450ce76e0100a74e94e23e694f93
