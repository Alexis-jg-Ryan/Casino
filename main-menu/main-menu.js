import { getCredits, setCredits } from "./../shared.js";

let creditsElement;

let creditsInt;

window.onload = function() {
    creditsElement = document.getElementById("credits");

    // Get credits from localStorage (via getCredits)
    creditsInt = getCredits();

    // Set the displayed credits in the HTML
    creditsElement.innerHTML = creditsInt;

    console.log(getCredits()); // For debugging

    document.getElementById("get-credits").addEventListener("click", add500creds)
};

function add500creds(){
    var temp = getCredits();
    temp += 500;
    setCredits(temp);
    creditsInt = getCredits();
    creditsElement.innerHTML = creditsInt;
}