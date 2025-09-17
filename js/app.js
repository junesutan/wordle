// TODO 
// OK use the DOM to retrieve elements
// store user input as a array --> put it on the board 
// store solution as array 
// initialise the result array 
// loop through and compare user input with the secretword --> TURN TILE GREEN 
// put all the alphabets and how many there are into an object 
// if it's there, show -- TURN TILE YELLOW 



const secretWord = "APPLE"


const rows = 6;
const columns = 5;
let currentRow = 0;

/*-------------------------------- using the DOM to retrieve elements --------------------------------*/
const boardEl = document.getElementById("board");
const userInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-btn");

/*-------------------------------- Functions --------------------------------*/
function drawBoard() {
for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    boardEl.appendChild(tile);
    }
}
}

function fillTiles(guess) {
    const tiles = document.querySelectorAll(".tile"); //retrieve tiles 
    const rowStart = currentRow * columns;
    for (let c = 0; c < guess.length; c++) {
        tiles[rowStart+c].textContent = guess[c];
    }
}



function getGuess (){ 
    const guess = userInput.value.toUpperCase();
    // userInput.value = "";
    return guess;
}

// function fillTiles() {

// }

function countSecretWordLetters(word) {
    const counts = {};
    for (let i = 0; i<word.length; i++) {
        const letter = word[i]; //take one letter from the secret word 
        if (counts[letter]) { //returns true or false, looking inside the object for this letter 
            counts[letter]++;
        } else {
            counts[letter] = 1;
        }
    }
    return counts;
    }

function checkGuess(){
    const guess = getGuess(); 
    const guessArray = guess.split("");
    const secretWordArray = secretWord.split("");
    const resultArray = Array(5).fill("absent");
    // console.log(guessArray)
    // console.log(secretWordArray)
    // console.log(resultArray)

    // MAKE OBJECT OF THE SECRET WORD //
    const counts = countSecretWordLetters(secretWord);
    console.log(counts); 

    // CHECK FOR GREEN //
    for (let i = 0; i < guessArray.length; i++){ //HANDLE GREEN 
        if (guessArray[i] === secretWordArray[i]){
            // console.log(guessArray[i], "exact match")
            resultArray[i] = "exact";
            counts[guessArray[i]]--;
            // console.log(resultArray)
        } 
    }
    // CHECK FOR YELLOW //
    for (let i = 0; i < guessArray.length; i++){ //HANDLE GREEN 
        const character = guessArray[i];
        if (counts[character] > 0) {
            resultArray[i] = "present";
            counts[character]--;
        }


            // console.log(guessArray[i], "exact match")
            // console.log(resultArray)
        } 
        
    return resultArray;
}


    



drawBoard(); // call once, make it at the top
console.log(checkGuess());


/*-------------------------------- event listener --------------------------------*/
submitButton.addEventListener("click", () => {
    const userGuess = getGuess();
    fillTiles(userGuess);
    currentRow++;
})

userInput.addEventListener("keydown", () => {
    if (event.key ==="Enter"){
        const userGuess = getGuess();
        fillTiles(userGuess);
        currentRow++;
    }
})



// userInput = document.getElementById("guess-input")


//     <div id="board" class="board" aria-label="game board" role="grid" aria-live="polite"></div>



// console.log(userInput);