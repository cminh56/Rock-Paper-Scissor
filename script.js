let playerScore = 0;
let computerScore = 0;
let currentRound = 1;
const totalRounds = 5; // Change this for more/less rounds

function playGame(playerChoice) {
    if (currentRound > totalRounds) {
        alert("Game over! Please reset to play again.");
        return;
    }

    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Show computer's choice animation
    simulateComputerChoice();

    setTimeout(() => {
        determineWinner(playerChoice, computerChoice);
        currentRound++;
        checkGameOver();
    }, 1500); // Add delay to simulate animation
}

function determineWinner(playerChoice, computerChoice) {
    let result = '';

    // Highlight player choice
    document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('active'));
    document.getElementById(playerChoice).classList.add('active');

    // Game logic
    if (playerChoice === computerChoice) {
        result = "It's a tie!";
        playSound('tie');
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${playerChoice} beats ${computerChoice}.`;
        playerScore++;
        playSound('win');
    } else {
        result = `You lose! ${computerChoice} beats ${playerChoice}.`;
        computerScore++;
        playSound('lose');
    }

    // Update scores and round
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('result').innerHTML = `
        <p>Round ${currentRound}: ${result}</p>
        <p>You chose: <strong>${playerChoice}</strong></p>
        <p>Computer chose: <strong>${computerChoice}</strong></p>
    `;
}

function simulateComputerChoice() {
    const computerChoiceDisplay = document.getElementById('result');
    computerChoiceDisplay.innerHTML = `<p>Computer is thinking...</p>`;
}

function checkGameOver() {
    if (currentRound > totalRounds) {
        const resultMessage = playerScore > computerScore
            ? "Congratulations, you won the game!"
            : playerScore < computerScore
            ? "You lost the game. Better luck next time!"
            : "It's a tie game!";
        
        document.getElementById('result').innerHTML += `<p><strong>${resultMessage}</strong></p>`;

        // Save to leaderboard
        updateLeaderboard(playerScore);
    }
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    currentRound = 1;
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('result').innerHTML = '';
    document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('active'));
}

// Play sounds for win, lose, and tie
function playSound(outcome) {
    const soundMap = {
        win: 'winSound',
        lose: 'loseSound',
        tie: 'tieSound'
    };
    const sound = document.getElementById(soundMap[outcome]);
    sound.currentTime = 0;
    sound.play();
}

// Leaderboard feature
function updateLeaderboard(score) {
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        document.getElementById('result').innerHTML += `<p>New High Score: ${score}!</p>`;
    } else {
        document.getElementById('result').innerHTML += `<p>Your Score: ${score}. High Score: ${highScore}.</p>`;
    }
}
