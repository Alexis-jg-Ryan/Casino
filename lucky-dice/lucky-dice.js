import { getCredits, setCredits } from "./../shared.js";

var liveCredits;

var yellowDotImg1;
var yellowDotImg2;
var yellowDotImg3;

window.onload = function(){
    liveCredits = getCredits();
    showVisuals();
    startGame();
}

function showVisuals(){
    let lblCredits = document.getElementById("credit-ammount");
    lblCredits.innerHTML = liveCredits;
}

function startGame(){
    yellowDotImg1 = document.createElement("img");
}