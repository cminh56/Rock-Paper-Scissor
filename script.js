let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Highlight the selected choice
    document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('active'));
    document.getElementById(playerChoice).classList.add('active');

    let result = '';

    // Determine the winner
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

    // Update scores
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;

    // Display result
    document.getElementById('result').innerHTML = `
        <p>You chose: <strong>${playerChoice}</strong></p>
        <p>Computer chose: <strong>${computerChoice}</strong></p>
        <p>${result}</p>
    `;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    document.getElementById('result').innerHTML = '';
    document.querySelectorAll('.choice').forEach(choice => choice.classList.remove('active'));
}

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
