let currentRow = 0;

function fn1() {
  currentRow++;
  console.log(currentRow);
}

function fn2() {
  console.log(currentRow);
}

fn1();
fn2();
