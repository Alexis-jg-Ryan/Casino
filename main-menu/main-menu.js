import { getCredits, setCredits } from "./../shared.js";

window.onload = function() {
    let creditsElement = document.getElementById("credits");

    // Get credits from localStorage (via getCredits)
    let creditsInt = getCredits();

    // Set the displayed credits in the HTML
    creditsElement.innerHTML = creditsInt;

    console.log(getCredits()); // For debugging
};