/*
TODOS: 
1. event listener to capture input from user 
2. save user input as a guess then reset it 
3. function to check if guess is correct by comparing it with the secret 
4. function to reveal if guess is correct by changing the colours of the tiles 
*/


// const gridRows = 6;
// const gridColumns = 5;
// let currentRow = 0;
const secretWord = "APPLE";



//Grab DOM elements 
const boardEl = document.getElementById("board");
const userInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-btn");

//using event listener to check for DOM elements 
// submitButton.addEventListener("click", () => {
//   console.log("submit button was clicked!");
// });

//make counts an object to store the number of each letter



/*-------------------------------- Functions --------------------------------*/
 

//YELLOW: count number of letters to check for duplicates for yellow 
// function determineYellow() {
//     const counts = {};
//     const secretWordArray = secretWord.split("");
//     for (let i = 0; i<secretWordArray.length; i++) {
//         const character = secretWordArray[i];
//         if (counts[character]) {
//             counts [character] = counts[character] +1;
//         } else {
//             counts[character] = 1;
//         }
//         }
// }

//assess user input 
function storeUserGuess () {
    // const array = Array(5).fill("absent");
    const guess = userInput.value 
    console.log("user guessed: " + guess);
    return guess;
}

//present, absent, exact 
function assessUserGuess (guess) {
    console.log("assessing user guess");
    const guess2 = userInput.value 

    const secretWordArray = secretWord.split("");
    const resultArray = Array(5).fill("absent");
    const guessArray = guess2.toUpperCase().split("");
    
    console.log(resultArray);
    console.log(guessArray);
    console.log(secretWordArray);

    // CHECK FOR EXACT (GREEN) //
    for (let i = 0; i<guessArray.length; i++) {
        if (guessArray[i] === secretWordArray[i]) {
            resultArray[i] = "exact";
        }
    }

    // CHECK FOR PRESENT (YELLOW) //
    for (let i=0; i<guessArray.length; i++) {
        const counts = {};
        if (resultArray[i] === "exact") // IF GREEN, PASS 
            continue;

        const character = guessArray[i]; // CHECK FOR DUPLICATES 

        if (counts[character] > 0) {
            resultArray[i].status = "present";
            counts[character]--; // reduce the number of counts 
        }
    
    // for (let i = 0; i<secretWordArray.length; i++) {
    //     const character = secretWordArray[i];
    //     if (counts[character]) {
    //         counts [character] = counts[character] +1;
    //     } else {
    //         counts[character] = 1;
    //     }
    //     }
    // }


    console.log(resultArray);

}

submitButton.addEventListener("click", () => {
  storeUserGuess();
  assessUserGuess();
});


