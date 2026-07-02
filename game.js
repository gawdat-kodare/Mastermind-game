let chooseUlLeft = document.querySelector(".choose-left");
let okBtn = document.querySelector(".btn");

let level = localStorage.getItem("level") || "easy";
let total = level === "hard" ? 20 : 32;
let maxTries = total / 4;

let numLocation = 0;

const gameColar = [
  "red",
  "yellow",
  "blue",
  "darkorange",
  "green",
  "aqua",
  "purple",
];
if (chooseUlLeft) {
  for (let i = 0; i < total; i++) {
    let li = document.createElement("li");
    li.dataset.index = i;

    let rowNumber = Math.floor(i / 4);
    li.dataset.row = rowNumber;

    let colorIndex = -1;

    li.addEventListener("click", function () {
      if (parseInt(rowNumber) !== numLocation) {
        return;
      }

      colorIndex++;
      if (colorIndex >= gameColar.length) {
        colorIndex = 0;
      }

      li.style.backgroundColor = gameColar[colorIndex];
      li.style.opacity = "1";
      li.dataset.selectedColar = gameColar[colorIndex];
    });

    chooseUlLeft.appendChild(li);
  }
}
// ---------------------------------------------------------------------------
let chooseUlRight = document.querySelector(".choose-right");
// let total = 32;
for (let i = 0; i < total; i++) {
  let li = document.createElement("li");
  li.dataset.index = i;
  let rowNumber = Math.floor(i / 4);
  li.dataset.row = rowNumber;
  chooseUlRight.appendChild(li);
}
// ----------------------------------------------------------------------------

if (okBtn) {
  okBtn.addEventListener("click", function () {
    let goOn = document.querySelectorAll(
      `.choose-left li[data-row="${numLocation}"]:not([data-selected-colar])`,
    );
    if (goOn.length > 0) {
      alert("Choose colors before");
      return;
    }

    let rowLisLeft = document.querySelectorAll(
      `.choose-left li[data-row="${numLocation}"]`,
    );
    let guessColors = Array.from(rowLisLeft).map(
      (li) => li.dataset.selectedColar,
    );

    let rowLisRight = document.querySelectorAll(
      `.choose-right li[data-row="${numLocation}"]`,
    );

    let secretLeft = [...secretColors];
    let resultColors = ["", "", "", ""];

    for (let i = 0; i < 4; i++) {
      if (guessColors[i] === secretLeft[i]) {
        resultColors[i] = "green";
        secretLeft[i] = "used";
      }
    }

    for (let i = 0; i < 4; i++) {
      if (resultColors[i] === "green") continue;

      let itSelf = false;

      for (let j = 0; j < 4; j++) {
        if (secretLeft[j] === guessColors[i]) {
          itSelf = true;
          secretLeft[j] = "used";
          break;
        }
      }

      resultColors[i] = itSelf ? "yellow" : "red";
    }

    for (let i = 0; i < 4; i++) {
      rowLisRight[i].style.backgroundColor = resultColors[i];
      rowLisRight[i].style.opacity = "1";
    }

    let isWin = resultColors.every((color) => color === "green");
    if (isWin) {
      alert("YOU WIN");
      location.reload();
      return;
    }

    numLocation++;
    if (numLocation >= maxTries) {
      alert("GAME OVER");
      let secretLis = secret.querySelectorAll("li");

      for (let i = 0; i < secretColors.length; i++) {
        if (secretLis[i]) {
          secretLis[i].style.backgroundColor = secretColors[i];
          secretLis[i].style.opacity = "1";
        }
      }

      setTimeout(() => {
        location.reload();
      }, 6000);

      return;
    }
  });
}
// -----------------------------------------------------------------------------
let secret = document.querySelector(".secret");
let num = 4;
let secretColors = [];

for (let i = 0; i < num; i++) {
  let li = document.createElement("li");
  li.dataset.index = i;

  let randmIndex = Math.floor(Math.random() * gameColar.length);
  let randmColor = gameColar[randmIndex];
  secretColors.push(randmColor);

  secret.appendChild(li);
}
// console.log("colors", secretColors);
