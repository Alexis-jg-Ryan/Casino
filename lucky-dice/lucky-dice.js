import { getCredits, setCredits } from "./../shared.js";

var liveCredits;
var currentbet;

var yellowDotImg1;
var yellowDotImg2;
var yellowDotImg3;

var yellowDotIndex;
var yellowsdots;

var indexs;

var index1;


window.onload = function(){
    liveCredits = getCredits();
    showVisuals();
    choosebet();
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
    document.getElementById("bet50").addEventListener("click", bet50);
    document.getElementById("bet150").addEventListener("click", bet150);
    document.getElementById("bet250").addEventListener("click", bet250);
    document.getElementById("betAllIn").addEventListener("click", betAllIn);
    document.getElementById('numberInput').addEventListener('change', verifyBet);

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

function showVisuals(){
    let lblCredits = document.getElementById("credit-ammount");
    lblCredits.innerHTML = liveCredits;
    document.getElementById('roll-btn').style.visibility = 'hidden';
    document.getElementById("restart-btn").addEventListener("click", restart);

}


let diceImages = ['car.png','cop.png','faucet.png','lightbulb.png','ring.png','train.png']

function startGame(){
    //when you click on it and active bet is not 0 it add to the right side of the bar (green dot) (max of 3 bets)
    
    document.getElementById('bet-ammount').innerText = currentbet;
    document.getElementById('roll-btn').style.visibility = 'visible';
    document.getElementById("roll-btn").addEventListener("click", roll);
}

function roll(){
    document.getElementById("db1").replaceChildren();
    document.getElementById("db2").replaceChildren();
    document.getElementById("db3").replaceChildren();
    document.getElementById("db4").replaceChildren();
    document.getElementById("db5").replaceChildren();
    document.getElementById("db6").replaceChildren();


    const diceImg1 = document.getElementById("die1");
    const diceImg2 = document.getElementById("die2");
    const diceImg3 = document.getElementById("die3");
    
    let rollCount = 0;
    const maxRolls = 50; // Number of times to switch images before stopping
    const intervalTime = 50; // Time between image changes (100ms)


    // Use setInterval to switch the dice image at intervals
    const rollingInterval = setInterval(() => {
        const randomIndex1 = Math.floor(Math.random() * diceImages.length);
        const randomIndex2 = Math.floor(Math.random() * diceImages.length);
        const randomIndex3 = Math.floor(Math.random() * diceImages.length);
        diceImg1.src = "dice-faces/" + diceImages[randomIndex1];
        diceImg2.src = "dice-faces/" + diceImages[randomIndex2];
        diceImg3.src = "dice-faces/" + diceImages[randomIndex3];

        indexs = [randomIndex1,randomIndex2,randomIndex3];

        rollCount++;
        if (rollCount >= maxRolls) {
            displaydots();
            clearInterval(rollingInterval); // Stop changing images after maxRolls
        }
    }, intervalTime);
}

function displaydots(){

    yellowDotImg1 = document.createElement("img");
    yellowDotImg1.src = "yellowdot.png";
    
    yellowDotImg2 = document.createElement("img");
    yellowDotImg2.src = "yellowdot.png";
    
    yellowDotImg3 = document.createElement("img");
    yellowDotImg3.src = "yellowdot.png";

    yellowsdots = [yellowDotImg1, yellowDotImg2, yellowDotImg3];
    yellowDotIndex = 0;

    
    for(let i = 0; i < 3; i++){
        indexs[i] += 1;
    }
    console.log(indexs);
    for(let i = 0; i < 3; i++){
        if (indexs[i] == 1){
            document.getElementById("db1").append(yellowsdots[yellowDotIndex]);
            yellowDotIndex++;
        }
    }
    for(let i = 0; i < 3; i++){
        if (indexs[i] == 2){
            document.getElementById("db2").append(yellowsdots[yellowDotIndex]);
            yellowDotIndex++;
        }
    }
    for(let i = 0; i < 3; i++){
        if (indexs[i] == 3){
            document.getElementById("db3").append(yellowsdots[yellowDotIndex]);
            yellowDotIndex++;
        }
    }
    for(let i = 0; i < 3; i++){
        if (indexs[i] == 4){
            document.getElementById("db4").append(yellowsdots[yellowDotIndex]);
            yellowDotIndex++;
        }
    }
    for(let i = 0; i < 3; i++){
        if (indexs[i] == 5){
            document.getElementById("db5").append(yellowsdots[yellowDotIndex]);
            yellowDotIndex++;
        }
    }
    for(let i = 0; i < 3; i++){
        if (indexs[i] == 6){
            document.getElementById("db6").append(yellowsdots[yellowDotIndex]);
            yellowDotIndex++;
        }
    }


}

function restart(){
    location.reload();
}
