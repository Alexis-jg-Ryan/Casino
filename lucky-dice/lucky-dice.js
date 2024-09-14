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

var element;
var  chipImg;

var lblCredits;

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
    if (liveCredits >=50){
        document.getElementById("bet50").addEventListener("click", bet50);
    }
    if (liveCredits >=150){
        document.getElementById("bet150").addEventListener("click", bet150);
    }
    if (liveCredits >=150){
        document.getElementById("bet250").addEventListener("click", bet250);
    }
    if (liveCredits > 0){
        document.getElementById("betAllIn").addEventListener("click", betAllIn);
        document.getElementById('numberInput').addEventListener('change', verifyBet);
    }

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
    lblCredits = document.getElementById("credit-ammount");
    lblCredits.innerHTML = liveCredits;
    document.getElementById('roll-btn').style.visibility = 'hidden';
    document.getElementById("restart-btn").addEventListener("click", restart);

}


let diceImages = ['car.png','cop.png','faucet.png','lightbulb.png','ring.png','train.png']

function startGame(){
    //when you click on it and active bet is not 0 it add to the right side of the bar (green dot) (max of 3 bets)
    
    document.getElementById('bet-ammount').innerText = currentbet;

    document.getElementById("grid-img1").addEventListener("click", chipcar);
    document.getElementById("grid-img2").addEventListener("click", chipcop);
    document.getElementById("grid-img3").addEventListener("click", chipfaucet);
    document.getElementById("grid-img4").addEventListener("click", chiplightbulb);
    document.getElementById("grid-img5").addEventListener("click", chipring);
    document.getElementById("grid-img6").addEventListener("click", chiptrain);
    document.getElementById('roll-btn').style.visibility = 'visible';
    document.getElementById("roll-btn").addEventListener("click", roll);
}


function chipcar(){
    if(element != null){
        element.remove();
        element = null; 
    }
    chipImg = document.createElement("img");
    chipImg.src = "./assets/pokerchip.png";
    chipImg.id = "chip-img"
    document.getElementById("top-left").append(chipImg);
    
    element = document.getElementById('chip-img');
}

function chipcop(){
    if(element != null){
        element.remove();
        element = null; 
    }
    chipImg = document.createElement("img");
    chipImg.src = "./assets/pokerchip.png";
    chipImg.id = "chip-img"
    document.getElementById("top-right").append(chipImg);
    
    element = document.getElementById('chip-img');
}
function chipfaucet(){
    if(element != null){
        element.remove();
        element = null; 
    }
    chipImg = document.createElement("img");
    chipImg.src = "./assets/pokerchip.png";
    chipImg.id = "chip-img"
    document.getElementById("middle-left").append(chipImg);
    
    element = document.getElementById('chip-img');
}
function chiplightbulb(){
    if(element != null){
        element.remove();
        element = null; 
    }else
    chipImg = document.createElement("img");
    chipImg.src = "./assets/pokerchip.png";
    chipImg.id = "chip-img"
    document.getElementById("middle-right").append(chipImg);
    
    element = document.getElementById('chip-img');

}
function chipring(){
    if(element != null){
        element.remove();
        element = null; 
    }
    chipImg = document.createElement("img");
    chipImg.src = "./assets/pokerchip.png";
    chipImg.id = "chip-img"
    document.getElementById("bottom-left").append(chipImg);
    
    element = document.getElementById('chip-img');
    
}
function chiptrain(){
    if(element != null){
        element.remove();
        element = null; 
    }
    chipImg = document.createElement("img");
    chipImg.src = "./assets/pokerchip.png";
    chipImg.id = "chip-img"
    document.getElementById("bottom-right").append(chipImg);
    
    element = document.getElementById('chip-img');
}


function roll(){
    document.getElementById("db1").replaceChildren();
    document.getElementById("db2").replaceChildren();
    document.getElementById("db3").replaceChildren();
    document.getElementById("db4").replaceChildren();
    document.getElementById("db5").replaceChildren();
    document.getElementById("db6").replaceChildren();
    
    document.getElementById("grid-img2").removeEventListener("click", chipcop);
    document.getElementById("grid-img3").removeEventListener("click", chipfaucet);
    document.getElementById("grid-img4").removeEventListener("click", chiplightbulb);
    document.getElementById("grid-img5").removeEventListener("click", chipring);
    document.getElementById("grid-img6").removeEventListener("click", chiptrain);


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
    document.getElementById("grid-img1").addEventListener("click", chipcar);
    document.getElementById("grid-img2").addEventListener("click", chipcop);
    document.getElementById("grid-img3").addEventListener("click", chipfaucet);
    document.getElementById("grid-img4").addEventListener("click", chiplightbulb);
    document.getElementById("grid-img5").addEventListener("click", chipring);
    document.getElementById("grid-img6").addEventListener("click", chiptrain);

    yellowDotImg1 = document.createElement("img");
    yellowDotImg1.src = "./assets/yellowdot.png";
    yellowDotImg1.id = "yellow-dot"
    
    yellowDotImg2 = document.createElement("img");
    yellowDotImg2.src = "./assets/yellowdot.png";
    yellowDotImg2.id = "yellow-dot"
    
    yellowDotImg3 = document.createElement("img");
    yellowDotImg3.src = "./assets/yellowdot.png";
    yellowDotImg3.id = "yellow-dot"

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

    restartGame()

}

function restartGame(){
    //change credits depending on current bet
    let ammountWinners=0;
    if(document.getElementById("chip-img") != null){
        for(let i = 0; i < 3; i++){
            if (indexs[i] == 1 && document.getElementById("chip-img").parentElement.id == "top-left"){
                console.log("nice");
                ammountWinners++;
            }
            if (indexs[i] == 2 && document.getElementById("chip-img").parentElement.id == "top-right"){
                console.log("nice");
                ammountWinners++;
            }
            if (indexs[i] == 3 && document.getElementById("chip-img").parentElement.id == "middle-left"){
                console.log("nice");
                ammountWinners++;
            }
            if (indexs[i] == 4 && document.getElementById("chip-img").parentElement.id == "middle-right"){
                console.log("nice");
                ammountWinners++;
            }
            if (indexs[i] == 5 && document.getElementById("chip-img").parentElement.id == "bottom-left"){
                console.log("nice");
                ammountWinners++;
            }
            if (indexs[i] == 6 && document.getElementById("chip-img").parentElement.id == "bottom-right"){
                console.log("nice");
                ammountWinners++;
            }
        }

        if(ammountWinners == 0){
            //lose money
            liveCredits -= currentbet;
            setCredits(liveCredits);
            console.log(liveCredits);
            liveCredits = getCredits();
        }else{
            liveCredits += currentbet * ammountWinners;
            setCredits(liveCredits);
            console.log(liveCredits);
            liveCredits = getCredits();
        }
        lblCredits.innerHTML = liveCredits;

        if(liveCredits == 0){
            document.getElementById('roll-btn').style.visibility = 'hidden';
            document.getElementById('restart-btn').style.visibility = 'hidden';
            document.getElementById('bet50').style.visibility = 'hidden';
            document.getElementById('bet150').style.visibility = 'hidden';
            document.getElementById('bet250').style.visibility = 'hidden';
            document.getElementById('betAllIn').style.visibility = 'hidden';
            document.getElementById('numberInput').style.visibility = 'hidden';

            document.getElementById("grid-img1").removeEventListener("click", chipcar);
            document.getElementById("grid-img2").removeEventListener("click", chipcop);
            document.getElementById("grid-img3").removeEventListener("click", chipfaucet);
            document.getElementById("grid-img4").removeEventListener("click", chiplightbulb);
            document.getElementById("grid-img5").removeEventListener("click", chipring);
            document.getElementById("grid-img6").removeEventListener("click", chiptrain);
        }
    }
}

function restart(){
    location.reload();
}
