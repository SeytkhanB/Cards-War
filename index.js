let deckId
let computerScore = 0
let playerScore = 0

let robsScore = 0
let persScore = 0

const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const compScore = document.getElementById('comp-score')
const personScore = document.getElementById('person-score')

const robsOverAllScore = document.getElementById('robs-over-all-score')
const persOverAllScore = document.getElementById('pers-over-all-score')


function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            if (data.remaining) {
                drawCardBtn.disabled = false
            }


            if (header.innerHTML === 'Computer Won!') {
                robsScore += 1
            }
            if (header.innerHTML === 'Player Won!') {
                persScore += 1
            }
            robsOverAllScore.innerHTML = robsScore
            persOverAllScore.innerHTML = persScore

            header.innerHTML = 'Game of War'


            compScore.innerHTML = 'Computer: 0'
            personScore.innerHTML = 'Person: 0'
            computerScore = 0
            playerScore = 0
        })
}
handleClick()

newDeckBtn.addEventListener("click", handleClick)

drawCardBtn.addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            remainingText.textContent = `Remaining cards: ${data.remaining}`
            cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />
            `
            cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />
            `
            const winnerText = determineCardWinner(data.cards[0], data.cards[1])
            header.textContent = winnerText
            
            compScore.innerHTML = `Computer: ${computerScore}`
            personScore.innerHTML = `Person: ${playerScore}`
            
            if (data.remaining === 0) {
                drawCardBtn.disabled = true
                if (computerScore > playerScore) {
                    header.innerHTML = 'Computer Won!'
                } else if (computerScore < playerScore) {
                    header.innerHTML = 'Player Won!'
                } else {
                    header.innerHTML = 'Tie'
                }
            }
        })
})


function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computerScore += 1
    } else if (card1ValueIndex < card2ValueIndex) {
        playerScore += 1
    } else {
        return
    }
    
    
    if (card1ValueIndex > card2ValueIndex) {
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        return "Person wins!"
    } else {
        return "War!"
    }
}


// SHUFFLING CARDS/DECK
// document.getElementById('shuffle-deck').addEventListener('click', () => {
//     fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/shuffle/?remaining=true`)
//         .then(res => res.json())
//         .then(data => console.log(data))
// })
