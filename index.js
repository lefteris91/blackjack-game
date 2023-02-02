// element declaration
const dealer =document.getElementById('dealer') 
const player = document.getElementById('player')
const playerSum = document.getElementById('player-sum')
const dealerSum = document.getElementById('dealer-sum')
const hitMeBtn = document.getElementById('hit-me-btn')
const stayBtn = document.getElementById('stay-btn')
const newGameBtn = document.getElementById('new-game-btn')
// 
// deck declaration
let num = ['ace',2,3,4,5,6,7,8,9,10,'jack','king','queen']
let type = ['hearts','spades','diamonds','clubs']
const deck= deckConstructor(num,type)
// 
// utility variables
let playerTotal = 0
let dealerTotal = 0
let playerCards = []
let dealerCards = []
// 
// events 
hitMeBtn.addEventListener('click', ()=>{
    playerCards.push(drawCard(deck))
    let card = playerCards.length -1
    player.innerHTML += createHtml(playerCards[card])
    playerTotal += playerCards[card].cardValue
    playerSum.innerHTML = 'Player total: ' + playerTotal
})

window.onload = startGame()
// 
// functions 
function startGame(){
    deckConstructor(num,type)
    shuffleDeck(deck)
    playerCards = [drawCard(deck),drawCard(deck)]
    dealerCards = [drawCard(deck)]
    for (let i=0; i<playerCards.length; i++){
        player.innerHTML += createHtml(playerCards[i])
        playerTotal += playerCards[i].cardValue
    }
    dealer.innerHTML = `<img src="./deck/back_black.png" id="hidden"/>` + createHtml(dealerCards[0])
    dealerTotal = dealerCards[0].cardValue
    playerSum.innerHTML += playerTotal
    dealerSum.innerHTML += dealerTotal
}
function deckConstructor (num,type){
    let deck=[]
    for (let i=0; i< num.length; i++){
        for (let j=0; j<type.length; j++){
            deck.push({
                cardValue: calculateValue(num[i]),
                imgUrl:"./deck/"+num[i]+"_of_"+type[j]+".png"
            })
        }
    }
    return deck
}
function calculateValue(num){
    if(isNaN(num)){
        if(num === 'ace'){
            return 11
        }else{
            return 10
        }
    }else{
        return num
    }
}
function shuffleDeck(deck){
    let shuffledNumbers = deck.sort(function () {
        return Math.random() - 0.5;
      });
}
function drawCard(deck){
    let card = deck.pop()
    console.log(deck)
    return card
}
function createHtml(card){
    let html = `<img src="${card.imgUrl}"/>`
    return html
}
// 
// 