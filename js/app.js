// TODO
// OK use the DOM to retrieve elements
// store user input as a array --> put it on the board
// store solution as array
// initialise the result array
// loop through and compare user input with the secretword --> TURN TILE GREEN
// put all the alphabets and how many there are into an object
// if it's there, show -- TURN TILE YELLOW

//MESSAGE
//number of tries left
//if number of tries = 0, and theyre not all green = you lose
//if number of tries > 0, show the number of tries
//if number of tries > 0 and they're all green = you win

const secretWord = "APPLE";

const rows = 6;
const columns = 5;
let currentRow = 0;

const winArray = Array(columns).fill("exact");

/*-------------------------------- using the DOM to retrieve elements --------------------------------*/
const boardEl = document.getElementById("board");
const userInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-btn");
const newGame = document.getElementById("newgame");
const message = document.getElementById("message");

// const hardMode = document.getElementById("hardmode");

/*-------------------------------- Functions --------------------------------*/

function changeMessage(res) {
  let numTries = rows - currentRow;
  let resultArray = res; //returns the result array

  console.log("result array: ", resultArray);
  console.log("win array: ", winArray);

  if (numTries > 0) {
    message.textContent = "number of tries left:  " + numTries;
  }

  // two separate arrays are not recognised to be the same with ===, so join first
  if (numTries >= 0 && resultArray.join("") === winArray.join("")) {
    message.textContent = "your word is correct, you win!";
    userInput.disabled = true;
    userInput.placeholder = "play again!";
    submitButton.disabled = true;
    console.log(currentRow);
    console.log("tile number: " + currentRow * columns);
    const tiles = document.querySelectorAll(".tile"); //returns node list
    for (i = currentRow * columns; i < tiles.length; i++) {
      const tile = tiles[i];
      tile.classList.add("greyedout");
    }
  }

  if (numTries === 0 && resultArray.join("") != winArray.join("")) {
    message.textContent = "no more tries ):  you lose!";
  }
}

function drawBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      boardEl.appendChild(tile);
    }
  }
}

function resetGame() {
  //new game
  currentRow = 0;
  message.textContent = "Enter a " + columns + "-letter word!";
  const tiles = document.querySelectorAll(".tile");
  console.log("tiles: ", tiles);
  console.log("tiltes.length : ", tiles.length);
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.textContent = "";
    tile.className = "tile";
  }
  userInput.disabled = false;
  submitButton.disabled = false;
}

function fillTiles(guess, result) {
  const tiles = document.querySelectorAll(".tile"); //retrieve tiles
  const rowStart = currentRow * columns; //returns the first tile of the current row

  for (let c = 0; c < guess.length; c++) {
    const tile = tiles[rowStart + c];
    tile.textContent = guess[c];
    tile.classList.add(result[c]);
  }
}

function colourTile(results) {
  const tiles = document.querySelectorAll(".tile"); //retrieve tiles
  const rowStart = currentRow * columns;

  for (let i = 0; i < results.length; i++) {
    const t = tiles[rowStart + i];
    t.classList.remove("exact", "present", "absent");
    t.classList.add(results[i]);
  }
}

function getGuess() {
  const guess = userInput.value.toUpperCase();
  // userInput.value = "";
  return guess;
}

// function fillTiles() {

// }

function countSecretWordLetters(word) {
  const counts = {};
  for (let i = 0; i < word.length; i++) {
    const letter = word[i]; //take one letter from the secret word
    if (counts[letter]) {
      //returns true or false, looking inside the object for this letter
      counts[letter]++;
    } else {
      counts[letter] = 1;
    }
  }
  return counts;
}

function checkGuess(userGu) {
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
  for (let i = 0; i < guessArray.length; i++) {
    //HANDLE GREEN
    if (guessArray[i] === secretWordArray[i]) {
      // console.log(guessArray[i], "exact match")
      resultArray[i] = "exact";
      counts[guessArray[i]]--;
      // console.log(resultArray)
    }
  }
  // CHECK FOR YELLOW //
  for (let i = 0; i < guessArray.length; i++) {
    //HANDLE GREEN
    const character = guessArray[i];
    if (counts[character] > 0 && resultArray[i] != "exact") {
      resultArray[i] = "present";
      counts[character]--;
    }
  }

  //   console.log("resultArray: ", resultArray);
  return resultArray;
}

drawBoard();
message.textContent = "Enter a " + columns + "-letter word!";
// console.log(checkGuess());

/*-------------------------------- event listener --------------------------------*/
submitButton.addEventListener("click", (event) => {
  if (userInput.value.length < 5) {
    alert("Type in a 5 letter word");
    return;
  }
  const userGuess = getGuess();
  //   console.log("userGuess: ", userGuess);
  //check if correct, returns an array of "exact", "present", "absent"
  const res = checkGuess(userGuess);
  //   console.log("res: ", res);
  //color tiles
  fillTiles(userGuess, res);

  //clear user input for next try
  userInput.value = "";

  currentRow++;
  changeMessage(res);
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (userInput.value.length < 5) {
      alert("Type in a 5 letter word");
      return;
    }
    const userGuess = getGuess();
    console.log("userGuess: ", userGuess);
    //check if correct, returns an array of "exact", "present", "absent"
    const res = checkGuess(userGuess);
    // console.log("res: ", res);
    //color tiles
    fillTiles(userGuess, res);

    //clear user input for next try
    userInput.value = "";

    currentRow++;
    changeMessage(res);
  }
});
newGame.addEventListener("click", (event) => {
  resetGame();
});

// hardMode.addEventListener("click", (event) => {
//   //   boardEl.id = "board2";

//   rows = 4;
//   columns = 7;
//   hardMode.className = "board2";
//   hardMode.id = "board2";
//   drawBoard();
// });

// userInput = document.getElementById("guess-input")

//     <div id="board" class="board" aria-label="game board" role="grid" aria-live="polite"></div>

// console.log(userInput);
