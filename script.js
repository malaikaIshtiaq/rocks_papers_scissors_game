'use strict';
const controllerButtons = document.querySelectorAll('div.controller button');
const gameController = document.querySelector('div.controller');
const gameDisplay = document.querySelector('div.display');
const startButton = document.querySelector('div.start-button button');
let playerScore = 0;
let computerScore = 0;

startButton.addEventListener('click', startGame);

function startGame(event) {
  resetScores();
  clearDisplay();
  showGameStart();
  toggleController();
  
  controllerButtons.forEach((button) => {
    button.addEventListener('click', playGame);
  });
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;
}

function clearDisplay() {
  while (gameDisplay.firstChild) {
    gameDisplay.removeChild(gameDisplay.firstChild);
  }
}

function showGameStart() {
  const firstPara = document.createElement('p');
  const secondPara = document.createElement('p');

  firstPara.textContent = `Let's see who wins.`;
  secondPara.textContent = 'Pick your weopen.';

  gameDisplay.appendChild(firstPara);
  gameDisplay.appendChild(secondPara);
}

function toggleController() {
  startButton.classList.toggle('hidden');
  gameController.classList.toggle('hidden');
}

function playGame(event) {
  const playerChoice = this.classList[0];
  const computerChoice = computerPlay();
  const results = checkResults(playerChoice, computerChoice);

  clearDisplay();
  updateScores(results);
  displayResults(results, playerChoice, computerChoice);
  displayScores();

  if (!(playerScore < 5 && computerScore < 5)) {
    const gameWinner = checkWinner();

    controllerButtons.forEach((button) => {
      button.removeEventListener('click', playGame);
    });

    displayWinner(gameWinner);
    toggleController();
    changeStartButton(gameWinner);
  }
}

function computerPlay() {
  const choiceList = ['rock', 'paper', 'scissors'];
  const choiceNumber = Math.floor(Math.random() * 3);

  return choiceList[choiceNumber];
}

function checkResults(playerChoice, computerChoice) {
  if (playerChoice === 'rock' && computerChoice === 'scissors' ||
      playerChoice === 'paper' && computerChoice === 'rock' ||
      playerChoice === 'scissors' && computerChoice === 'paper') {
    return 'win';
  } else if (computerChoice === 'rock' && playerChoice === 'scissors' ||
      computerChoice === 'paper' && playerChoice === 'rock' ||
      computerChoice === 'scissors' && playerChoice === 'paper') {
    return 'lose';
  } else {
    return 'tie';
  }
}

function updateScores(results) {
  if (results === 'win') {
    playerScore++;
  } else if (results === 'lose') {
    computerScore++;
  }
}

function displayResults(results, playerChoice, computerChoice) {
  const choicesText = document.createElement('p');
  const resultsText = document.createElement('p');

  choicesText.textContent = `So you choose  ${playerChoice} `;

  if (results === 'win') {
    resultsText.textContent = `I thought my ${computerChoice} would win.`;
  } else if (results === 'lose') {
    resultsText.textContent = `Hahaha! My ${computerChoice} won, so give up
        now.`;
  } else {
    resultsText.textContent = `What ? you copy me.`;
  }


  gameDisplay.appendChild(choicesText);
  gameDisplay.appendChild(resultsText);
}

function displayScores() {
  const scoresText = document.createElement('p');

  scoresText.textContent = `Computer: ${computerScore}, You:
      ${playerScore}`;

  gameDisplay.appendChild(scoresText);
}

function checkWinner() {
  if (playerScore > computerScore) {
    return 'player';
  } else {
    return 'computer';
  }
}

function displayWinner(gameWinner) {
  const winnerText = document.createElement('p');
	
  if (gameWinner === 'player') {
    winnerText.textContent = 'Hey you win.' ;
    winnerText.classList.add('player-wins');
  } else {
    winnerText.textContent = 'You lost the game try again'
    winnerText.classList.add('computer-wins');
  }

  gameDisplay.appendChild(winnerText);
	
}

function changeStartButton(gameWinner) {
  if (gameWinner === 'player') {
    startButton.textContent = 'Try Again';
  } else {
    startButton.textContent = 'Try Again'
  }
}
