import { getCredits, setCredits } from "./../shared.js";

var liveCredits;
var currentbet;

var yellowDotImg1;
var yellowDotImg2;
var yellowDotImg3;

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

function startGame(){
    document.getElementById('bet-ammount').innerText = currentbet;
    document.getElementById('roll-btn').style.visibility = 'visible';
    document.getElementById("restart-btn").addEventListener("click", roll);

}

let list = ['car.png','cop.png','faucet.png','lightbulb.png','ring.png','train.png']

//randominze in the setinterval function

function roll(){
    
}

function restart(){
    location.reload();
}

// let yellowDotImg1 = document.createElement("img");
// yellowDotImg1.src = "yellowdot.png";
// document.getElementById("db1").append(yellowDotImg1);

// let yellowDotImg2 = document.createElement("img");
// yellowDotImg2.src = "yellowdot.png";
// document.getElementById("db1").append(yellowDotImg2);

// let yellowDotImg3 = document.createElement("img");
// yellowDotImg3.src = "yellowdot.png";
// document.getElementById("db1").append(yellowDotImg3s);
