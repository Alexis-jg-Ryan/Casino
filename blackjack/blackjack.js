import { getCredits, setCredits } from "./../shared.js";



var currentbet = 0;

var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;
let liveCredits;

var canHit = false; //allows player to hit, playersum < 21

window.onload = function(){
    liveCredits = getCredits();
    console.log(liveCredits);
    
    buildVisuals();
    buildDeck();
    shuffleDeck();
    choosebet();
}

function buildVisuals(){
    let lblCredits = document.getElementById("credit-ammount");
    lblCredits.innerHTML = liveCredits
    // Create the first card image
    let tempImg1 = document.createElement("img");
    tempImg1.src = "./Flat-Playing-Cards-Set/back.png";
    document.getElementById("dealer-cards").append(tempImg1);
    tempImg1.id = "tempimg1"

    // Create the second card image
    let tempImg2 = document.createElement("img");
    tempImg2.src = "./Flat-Playing-Cards-Set/back.png";
    document.getElementById("dealer-cards").append(tempImg2);
    tempImg2.id = "tempimg2"

    // Create the third card image
    let tempImg3 = document.createElement("img");
    tempImg3.src = "./Flat-Playing-Cards-Set/back.png";
    document.getElementById("your-cards").append(tempImg3);
    tempImg3.id = "tempimg3"

    // Create the last card image
    let tempImg4 = document.createElement("img");
    tempImg4.src = "./Flat-Playing-Cards-Set/back.png";
    document.getElementById("your-cards").append(tempImg4);
    tempImg4.id = "tempimg4"

    
}

function bet50() {
    currentbet = 50;
    startGame();
}

function bet150() {
    currentbet = 150;
    startGame();
}

function bet250() {
    currentbet = 250;
    startGame();
}

function betAllIn() {
    currentbet = liveCredits;
    startGame();
}

function choosebet(){

    // Add event listeners
    if (liveCredits >= 50){
        document.getElementById("bet50").addEventListener("click", bet50);
    }
    if(liveCredits >= 150){
        document.getElementById("bet150").addEventListener("click", bet150);
    }if(liveCredits >= 250){
        document.getElementById("bet250").addEventListener("click", bet250);
    }if(liveCredits > 0){
        document.getElementById("betAllIn").addEventListener("click", betAllIn);
        document.getElementById('numberInput').addEventListener('change', verifyBet);
    }

    document.getElementById('hit').style.visibility = 'hidden';
    document.getElementById('stay').style.visibility = 'hidden';
    document.getElementById('restart').style.visibility = 'hidden';

}

function verifyBet(){
    let input = document.getElementById("numberInput")
    if (( input.value < 1) || (input.value > liveCredits)){
        input.value = ""; // Clear the input
        input.placeholder = "Invalid !!!";
        choosebet();
    }else{
        currentbet = input.value;
        startGame();
    }
}

function buildDeck(){
    let values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    let types = ["c","s","d","h"];
    deck = [];

    for(let i of values){
        for(let j of types){
            deck.push(String(i) + String(j));
        }
    }
} 

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length); //give a random number from 0-51
        
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame(){
    document.getElementById('restart').style.visibility = 'hidden';

    let tempImg1 = document.getElementById("tempimg1")
    let tempImg2 = document.getElementById("tempimg2")
    let tempImg3 = document.getElementById("tempimg3")
    let tempImg4 = document.getElementById("tempimg4")
    tempImg1.remove();
    tempImg2.remove();
    tempImg3.remove();
    tempImg4.remove();    

    document.getElementById('hit').style.visibility = 'visible';
    document.getElementById('stay').style.visibility = 'visible';


    //make them grey when disabled or invisible
    document.getElementById('bet50').style.visibility = 'hidden';
    document.getElementById('bet150').style.visibility = 'hidden';
    document.getElementById('bet250').style.visibility = 'hidden';
    document.getElementById('betAllIn').style.visibility = 'hidden';
    document.getElementById('numberInput').style.visibility = 'hidden'; //broken





    document.getElementById('bet-ammount').innerText = currentbet;


    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./Flat-Playing-Cards-Set/"+ card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);

    document.getElementById("dealer-sum").innerText = dealerSum;

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let backimg = document.createElement("img");
    backimg.src = "./Flat-Playing-Cards-Set/back.png";
    backimg.id = "hidden"
    document.getElementById("dealer-cards").append(backimg);

    
    
    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Flat-Playing-Cards-Set/"+ card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    document.getElementById("your-sum").innerText = reduceAce(yourSum,yourAceCount);
    
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    
    if(yourSum == 21 && dealerSum == 21){
        bothBlackjack();
    }
    else if(yourSum == 21){
        blackjack();
    }else if (dealerSum == 21){
        dealerBlackjack();
    }
}
function bothBlackjack(){
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Flat-Playing-Cards-Set/"+ card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./Flat-Playing-Cards-Set/" + hidden + ".png";

    let message = "Push! ";
    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("hit").removeEventListener("click", hit);
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("bet50").removeEventListener("click", bet50);
    document.getElementById("bet150").removeEventListener("click", bet150);
    document.getElementById("bet250").removeEventListener("click", bet250);
    document.getElementById("betAllIn").removeEventListener("click", betAllIn);
    document.getElementById('numberInput').removeEventListener('change', verifyBet);

    document.getElementById('hit').style.visibility = 'hidden';
    document.getElementById('stay').style.visibility = 'hidden';
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById('restart').style.visibility = 'visible'; // move this around and the one above


}
function dealerBlackjack(){
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Flat-Playing-Cards-Set/"+ card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }

    let message="Dealer Blackjack :("
    
    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;

    canHit = false;
    document.getElementById("hidden").src = "./Flat-Playing-Cards-Set/" + hidden + ".png";

    message = "Dealer got BlackJack! !";
    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("hit").removeEventListener("click", hit);
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("bet50").removeEventListener("click", bet50);
    document.getElementById("bet150").removeEventListener("click", bet150);
    document.getElementById("bet250").removeEventListener("click", bet250);
    document.getElementById("betAllIn").removeEventListener("click", betAllIn);
    document.getElementById('numberInput').removeEventListener('change', verifyBet);

    document.getElementById('hit').style.visibility = 'hidden';
    document.getElementById('stay').style.visibility = 'hidden';
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById('restart').style.visibility = 'visible'; // move this around and the one above

    liveCredits -= currentbet;
    setCredits(liveCredits);
    console.log(liveCredits);
}

function blackjack(){
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;

    let message = "BlackJack! !";
    document.getElementById("results").innerText = message;
    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("hit").removeEventListener("click", hit);
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("bet50").removeEventListener("click", bet50);
    document.getElementById("bet150").removeEventListener("click", bet150);
    document.getElementById("bet250").removeEventListener("click", bet250);
    document.getElementById("betAllIn").removeEventListener("click", betAllIn);
    document.getElementById('numberInput').removeEventListener('change', verifyBet);
    document.getElementById('hit').style.visibility = 'hidden';
    document.getElementById('stay').style.visibility = 'hidden';

    liveCredits += currentbet*1.25;
    setCredits(liveCredits);
    console.log(liveCredits);
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById('restart').style.visibility = 'visible'; // move this around and the one above
}

function restart(){
    location.reload();
}

function stay(){
    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Flat-Playing-Cards-Set/"+ card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        while(reduceAce(dealerSum) != dealerSum){
            dealerSum = reduceAce(dealerSum, dealerAceCount);
        }
        
        dealerSum = reduceAce(dealerSum, dealerAceCount);
        document.getElementById("dealer-cards").append(cardImg);
        console.log(dealerSum);
    }

    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./Flat-Playing-Cards-Set/" + hidden + ".png";

    let message = "";
    if (yourSum > dealerSum){
        message = "You win !";
        liveCredits += currentbet;
        setCredits(liveCredits);
        console.log(liveCredits);
    }else if(yourSum == 21){
        message = "You Win !"
        liveCredits += currentbet;
        setCredits(liveCredits);
        console.log(liveCredits);  
    }else if(yourSum == 21 && dealerSum == 21){
        message = "Push !"
    }else if(dealerSum > 21){ 
        message = "dealer went over !";
        liveCredits += currentbet;
        setCredits(liveCredits); 
        console.log(liveCredits);
    }else if(yourSum == dealerSum){
        message = "Push!";
    }else if (yourSum < dealerSum){
        message = "You lose !";
        liveCredits -= currentbet;
        setCredits(liveCredits);
        console.log(liveCredits);
    }
    document.getElementById("results").innerText = message;
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;

    document.getElementById("hit").removeEventListener("click", hit);
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("bet50").removeEventListener("click", bet50);
    document.getElementById("bet150").removeEventListener("click", bet150);
    document.getElementById("bet250").removeEventListener("click", bet250);
    document.getElementById("betAllIn").removeEventListener("click", betAllIn);
    document.getElementById('numberInput').removeEventListener('change', verifyBet);

    document.getElementById('hit').style.visibility = 'hidden';
    document.getElementById('stay').style.visibility = 'hidden';
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById('restart').style.visibility = 'visible'; // move this around and the one above

}

function hit() {
    let reduceAceResult = reduceAce(yourSum, yourAceCount);
    if(reduceAceResult < 21){
        canHit = true;
    }else{
        canHit = false
        stay();
    }
    
    if (!canHit){
        stay();
    }else{
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./Flat-Playing-Cards-Set/"+ card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);

        document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
        // console.log(cardImg.src)
    }

    reduceAceResult = reduceAce(yourSum, yourAceCount)
    if(reduceAceResult == 21){
        stay();
    }else if(reduceAceResult > 21){
        bust();
    }
}

function bust(){
    document.getElementById("hit").removeEventListener("click", hit);
    document.getElementById("stay").removeEventListener("click", stay);
    document.getElementById("bet50").removeEventListener("click", bet50);
    document.getElementById("bet150").removeEventListener("click", bet150);
    document.getElementById("bet250").removeEventListener("click", bet250);
    document.getElementById("betAllIn").removeEventListener("click", betAllIn);
    document.getElementById('numberInput').removeEventListener('change', verifyBet);
    
    document.getElementById('hit').style.visibility = 'hidden';
    document.getElementById('stay').style.visibility = 'hidden';

    let message = "You busted !";
    document.getElementById("results").innerText = message;
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
    liveCredits -= currentbet;
    setCredits(liveCredits);
    console.log(liveCredits);
    document.getElementById("restart").addEventListener("click", restart);
    document.getElementById('restart').style.visibility = 'visible'; // move this around and the one above
}

function reduceAce(sum, aceCount){
    while(sum > 21 && aceCount > 0){
        sum-=10;
        aceCount -=1;
    }
    return sum;
}

function getValue(card) {
    let value = card.substring(0, card.length - 1); // Isolate the rank (e.g., "10", "A", "K")
    console.log(value)
    if (value === "K" || value === "Q" || value === "J") {
        return 10;
    }
    if (value === "A") {
        return 11; // Ace initially counts as 11
    }
    console.log(parseInt(value)) //look at this when you have the time
    return parseInt(value); // Handles number cards (2-10)
}

function checkAce(card){
    if (card[0] == "A"){
        return 1;
    }else{
        return 0;
    }
}

// show score as you go

