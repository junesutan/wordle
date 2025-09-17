// TODO
// OK use the DOM to retrieve elements
// store user input as a array --> put it on the board
// store solution as array
// initialise the result array
// loop through and compare user input with the secretword --> TURN TILE GREEN
// put all the alphabets and how many there are into an object
// if it's there, show -- TURN TILE YELLOW

const secretWord = "APPLE";

const rows = 6;
const columns = 5;
let currentRow = 0;

/*-------------------------------- using the DOM to retrieve elements --------------------------------*/
const boardEl = document.getElementById("board");
const userInput = document.getElementById("guess-input");
const submitButton = document.getElementById("submit-btn");
const newGame = document.getElementById("newgame");
// const hardMode = document.getElementById("hardmode");

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

function clearTiles() {
  const tiles = document.querySelectorAll(".tile");
  console.log("tiles: ", tiles);
  console.log("tiltes.lengjt: ", tiles.length);
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];

    tile.textContent = "";
    tile.classList.remove("exact", "present", "absent");
    currentRow = 0;
  }
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

  console.log("resultArray: ", resultArray);
  return resultArray;
}

drawBoard(); // call once, make it at the top
console.log(checkGuess());

/*-------------------------------- event listener --------------------------------*/
submitButton.addEventListener("click", (event) => {
  if (userInput.value.length < 5) {
    alert("Type in a 5 letter word");
    return;
  }
  const userGuess = getGuess();
  console.log("userGuess: ", userGuess);
  //check if correct, returns an array of "exact", "present", "absent"
  const res = checkGuess(userGuess);
  console.log("res: ", res);
  //color tiles
  fillTiles(userGuess, res);

  //clear user input for next try
  userInput.value = "";

  currentRow++;
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
    console.log("res: ", res);
    //color tiles
    fillTiles(userGuess, res);

    //clear user input for next try
    userInput.value = "";

    currentRow++;
  }
});

newGame.addEventListener("click", (event) => {
  clearTiles();
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
