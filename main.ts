// === DOM ELEMENT SELECTION ===
const score0El = document.getElementById('score--0')! as HTMLParagraphElement;
const score1El = document.getElementById('score--1')! as HTMLParagraphElement;
const diceEl = document.querySelector('.dice') as HTMLDivElement;

// Player containers
const activePlayerEl = document.querySelector('.player--active') as HTMLDivElement
const player0El = document.querySelector('.player--0') as HTMLDivElement
const player1El = document.querySelector('.player--1') as HTMLDivElement

// Current score elements
const currentScore0El = document.getElementById('current--0')! as HTMLParagraphElement
const currentScore1El = document.getElementById('current--1')! as HTMLParagraphElement
const currentScoreEles = [currentScore0El, currentScore1El]

// Game control buttons
const btnNewEl = document.querySelector('.btn--new') as HTMLButtonElement;
const btnRollEl = document.querySelector('.btn--roll') as HTMLButtonElement;
const btnHoldEl = document.querySelector('.btn--hold') as HTMLButtonElement;

// Dice emoji representations
const diceEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣']

// === GAME STATE VARIABLES ===
let activePlayer = 0;      // 0 for Player 1, 1 for Player 2
let currentScore = 0;      // Current round score
let scores = [0, 0]        // Total scores for both players

// === INITIALIZE GAME STATE ===
function initialGameState(): void {
  // Reset scores and state variables
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  // Reset UI scores
  score0El.textContent = '0';
  score1El.textContent = '0';
  currentScoreEles[0].textContent = '0';
  currentScoreEles[1].textContent = '0';

  // Remove winner class if present
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Set Player 1 as active, Player 2 as inactive
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Hide dice at start
  diceEl.classList.add('hidden');
}

// === SWITCH ACTIVE PLAYER ===
function switchPlayer() {
  // Reset current score display for active player
  currentScoreEles[activePlayer].textContent = '0';
  currentScore = 0;

  // Switch active player (toggle between 0 and 1)
  activePlayer = activePlayer === 0 ? 1 : 0;

  // Toggle active player styling
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// === STARTING CONDITIONS ===
initialGameState();

// === ROLL DICE BUTTON HANDLER ===
btnRollEl.addEventListener('click', function () {
  // 1. Generate random dice roll (1-6)
  let dice = Math.floor(Math.random() * 6) + 1

  // 2. Show the dice
  diceEl.classList.remove('hidden')

  // 3. If dice is 1, switch player and reset current score
  if (dice === 1) {
    switchPlayer();
    diceEl.textContent = diceEmojis[0];
    return;
  }

  // 4. If dice is not 1, add to current score and update UI
  diceEl.textContent = diceEmojis[dice - 1]
  currentScore += dice
  currentScoreEles[activePlayer].textContent = String(currentScore)
})

// === HOLD BUTTON HANDLER ===
btnHoldEl.addEventListener('click', function () {
  // 1. Add current score to active player's total score
  scores[activePlayer] += currentScore

  // 2. Update total score UI for active player
  if (activePlayer === 0) {
    score0El.textContent = String(scores[0])
  } else {
    score1El.textContent = String(scores[1])
  }

  // 3. Reset current score and switch player
  currentScore = 0
  currentScoreEles[activePlayer].textContent = "0"
  switchPlayer();
})

// === NEW GAME BUTTON HANDLER ===
btnNewEl.addEventListener('click', initialGameState);
