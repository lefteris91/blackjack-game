// element declaration
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
let playerObj = {
    id: document.getElementById('player'),
    sumId: document.getElementById('player-sum'),
    name: 'Player',
    cards:[],
    total: 0
}
let dealerObj = {
    id: document.getElementById('dealer'),
    sumId: document.getElementById('dealer-sum'),
    name: 'Dealer',
    cards:[],
    total: 0
}
let aceCounter = 0
let win = false
let lose = false
// 
// events
window.onload = startGame()

hitMeBtn.addEventListener('click', ()=>{
    renderCard(playerObj)
})
stayBtn.addEventListener('click', ()=>{
    dealersTurn()
})
// 
// functions 
function startGame(){
    deckConstructor(num,type)
    shuffleDeck(deck)
    playerObj.cards = [drawCard(deck),drawCard(deck)]
    dealerObj.cards = [drawCard(deck),drawCard(deck)]
    for (let i=0; i<playerObj.cards.length; i++){
        playerObj.id.innerHTML += createHtml(playerObj.cards[i])
        playerObj.total += playerObj.cards[i].cardValue
        aceCheck(playerObj.cards[i])
    }
    totalCheck(playerObj.total)
    console.log(win,lose)
    dealerObj.id.innerHTML = `<img src="./deck/back_black.png" id="hidden"/>` + createHtml(dealerObj.cards[1])
    dealerObj.total = dealerObj.cards[1].cardValue
    playerObj.sumId.innerHTML += playerObj.total
    dealerObj.sumId.innerHTML += dealerObj.total
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
function renderCard(player){
    player.cards.push(drawCard(deck))
    let card = player.cards.length -1
    player.id.innerHTML += createHtml(player.cards[card])
    player.total += player.cards[card].cardValue
    aceCheck(player.cards[card])
    player.total = aceHandler(player.total,aceCounter)
    totalCheck(player.total)
    console.log(win,lose)
    player.sumId.innerHTML = player.name + ' total: ' + player.total 
}
function createHtml(card){
    let html = `<img src="${card.imgUrl}"/>`
    return html
}
function aceCheck(card){
    if (card.cardValue === 11){
        aceCounter++
    }
}
function aceHandler(total,ace){
    if(total>21 && ace>0){
        total -= 10
        aceCounter--
        return total
    }else{
        return total
    }  
}
function totalCheck(playerTotal){
    if(playerTotal === 21){
        return win = true
    }else if(playerTotal > 21 ){
        return lose = true
    }
}
function dealersTurn(){
      dealerObj.id.innerHTML = ''
      dealerObj.sumId.innerHTML ='Dealer total: '
      dealerObj.total = 0
      for (let i=0; i<dealerObj.cards.length; i++){
        dealerObj.id.innerHTML += createHtml(dealerObj.cards[i])
        dealerObj.total += dealerObj.cards[i].cardValue
        aceCheck(dealerObj.cards[i])
    }
    dealerObj.sumId.innerHTML += dealerObj.total
    while(dealerObj.total < playerObj.total && dealerObj.total <= 21){
        renderCard(dealerObj)
   }    
}

