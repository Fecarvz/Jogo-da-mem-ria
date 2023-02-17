const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'beth',
  'jerry',
  'morty',
  'rick',
  'summer',
  'jessica',
  'scroopy',
  'pessoa-passaro',
  'meeseeks',
  'pickle-rick'
]



const createElement = (element, className) => {
  const newElement = document.createElement(element)
  newElement.className = className
  return newElement
}

let firstCard = null
let secondCard = null

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card')

  if(disabledCards.length === 20) {
    const endGame = createElement('div', 'end-game')
    const endGameText = createElement('h1', 'end-game-text')
    endGameText.innerText = 'Parabéns, você ganhou! em ' + timer.innerHTML + ' segundos'
    endGame.appendChild(endGameText)

    const restartButton = createElement('button', 'restart-button')
    restartButton.innerText = 'Reiniciar'
    restartButton.addEventListener('click', () => {
      localStorage.clear('player')
      window.location = '../index.html'
    })
    endGame.appendChild(restartButton)
    grid.appendChild(endGame)



    document.body.classList.add('blur')
  }
}
  

const resetCards = () => {
  firstCard = null
  secondCard = null
}
const checkCards = () => {
  if(firstCard.dataset.character === secondCard.dataset.character) {
    firstCard.firstChild.classList.add('disabled-card')
    secondCard.firstChild.classList.add('disabled-card')
    
    resetCards()

    checkEndGame()
  }else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card')
      secondCard.classList.remove('reveal-card')

      resetCards()
    }, 1000)
  }
}
  
const revealCard = ({ target }) => {
  if(target.parentNode.className.includes('reveal-card')) {
    return
  }

  if(firstCard === null) {
    firstCard = target.parentNode
    firstCard.classList.add('reveal-card')
  }else if(secondCard === null) {
    secondCard = target.parentNode
    secondCard.classList.add('reveal-card')

    checkCards()
  }
}

const createCard = (character) => {
  const card =  createElement("div", "card") 
  const front = createElement("div", "face front")
  const back = createElement("div", "face back")

  front.style.backgroundImage = `url(../images/${character}.png)`

  card.appendChild(front)
  card.appendChild(back)
  
  card.addEventListener('click', revealCard)
  card.setAttribute('data-character', character)
  return card
}

const loadGame = () => {

  const duplicateCharacters = [...characters, ...characters]

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

  shuffledArray.map((character) => {
    const newCard = createCard(character)
    grid.appendChild(newCard)
  })
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}