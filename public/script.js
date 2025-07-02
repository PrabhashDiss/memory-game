const cardsArray = ['🍎','🍌','🍓','🍇','🍉','🍒','🍑','🍍'];
let gameGrid = [...cardsArray, ...cardsArray].sort(() => 0.5 - Math.random());

const board = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lock = false;

function createCard(value) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.value = value;
  card.innerText = '?';
  card.addEventListener('click', () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (lock || card === firstCard || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.value;

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lock = true;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = '?';
        secondCard.innerText = '?';
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

function setupBoard() {
  gameGrid.forEach(value => {
    board.appendChild(createCard(value));
  });
}

setupBoard();
