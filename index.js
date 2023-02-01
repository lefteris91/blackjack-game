const dealer =document.getElementById('dealer') 
const player = document.getElementById('player')
const playerSum = document.getElementById('player-sum')
const dealerSum = document.getElementById('dealer-sum')
const hitMeBtn = document.getElementById('hit-me-btn')
const stayBtn = document.getElementById('stay-btn')
const newGameBtn = document.getElementById('new-game-btn')

let num = ['ace',2,3,4,5,6,7,8,9,10,'jack','king','queen']
let type = ['hearts','spades','diamonds','clubs']
const deck= deckConstructor(num,type)
hitMeBtn.addEventListener('click', ()=>{
    shuffleDeck(deck)
    console.log(deck)
    let card = drawCard(deck)
    
    player.innerHTML += `<img src="${card.imgUrl}"/>`
    
    
})

// functions 
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
// 
