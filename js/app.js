const wordSolution = "APPLE";




document.addEventListener("DOMContentLoaded", () => {
  console.log("app.js loaded");

  const NROWS = 6, NCOLS = 5;

  const boardEl = document.getElementById("board");
  const kbEl = document.getElementById("kb");

  const input = document.getElementById("guess-input");
  const submitBtn = document.getElementById("submit-btn");

  // draw board tiles
  boardEl.innerHTML = ""; 
  for (let r = 0; r < NROWS; r++) {
    for (let c = 0; c < NCOLS; c++) {
      const d = document.createElement("div");
      d.className = "tile";
      d.textContent = ""; // empty tiles
      boardEl.appendChild(d);
    }
  }

  submitBtn.addEventListener("click", () => {
  const guess = input.value.toUpperCase();
  if (guess.length !== 5) {
    alert("Please enter a 5-letter word");
    return;
  }
  console.log("Your guess:", guess); // replace later with function to update board
  input.value = ""; // clear input
});
//   keyboard 
//   "QWERTYUIOPASDFGHJKLZXCVBNM".split("").forEach(ch => {
//     const b = document.createElement("button");
//     b.className = "key";
//     b.textContent = ch;
//     kbEl.appendChild(b);
//   });
});


//CONFIG 
console.log(guess)








// // ====== Config ======
// tile.classList.remove('correct','present','absent');
// tile.classList.add(res[c]);
// statuses[r][c] = res[c];
// colorKeyboard(board[r][c], res[c]);


// function colorKeyboard(letter, status){
// const btn = kbEl.querySelector(`[data-key="${letter}"]`);
// if (!btn) return;
// const current = ['absent','present','correct'].find(c => btn.classList.contains(c));
// if (!current || keyRank[status] > keyRank[current]){
// btn.classList.remove('absent','present','correct');
// btn.classList.add(status);
// }
// }


// function say(msg){
// toastEl.textContent = msg; toastEl.classList.add('show');
// setTimeout(()=> toastEl.classList.remove('show'), 1100);
// }


// function shakeRow(r){
// for (let c=0;c<NCOLS;c++){
// const t = document.getElementById(`t-${r}-${c}`);
// t.classList.add('shake'); setTimeout(()=> t.classList.remove('shake'), 320);
// }
// }


// // ====== Core scoring ======
// function scoreGuess(guess, solution) {
// const N = 5;
// const result = Array(N).fill('absent');
// const sol = solution.split('');
// const gss = guess.split('');


// const freq = {};
// for (let i=0; i<N; i++){
// if (gss[i] === sol[i]){
// result[i] = 'correct';
// } else {
// const c = sol[i];
// freq[c] = (freq[c] || 0) + 1;
// }
// }
// for (let i=0; i<N; i++){
// if (result[i] !== 'correct'){
// const c = gss[i];
// if (freq[c] > 0){ result[i] = 'present'; freq[c]--; }
// }
// }
// return result;
// }