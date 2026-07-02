let switchBtn = document.querySelector(".Switch");

if (switchBtn) {
  if (localStorage.getItem("pageTheme") === "dark") {
    document.body.classList.add("dark");
    switchBtn.textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark");
    switchBtn.textContent = "Dark Mode";
  }

  switchBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      switchBtn.textContent = "Light Mode";
      localStorage.setItem("pageTheme", "dark");
    } else {
      switchBtn.textContent = "Dark Mode";
      localStorage.setItem("pageTheme", "light");
    }
  });
} else {
  if (localStorage.getItem("pageTheme") === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

let playBtn = document.getElementById("playBtn");
let levelBtns = document.querySelectorAll(".level-btn");

if (playBtn) {
  playBtn.addEventListener("click", function () {
    playBtn.style.display = "none";

    levelBtns.forEach((btn) => {
      btn.style.display = "block";
    });
  });
}

if (levelBtns.length > 0) {
  levelBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      localStorage.setItem("level", btn.dataset.level);
      window.location.href = "game.html";
    });
  });
}

const pageTranslations = {
  en: {
    btn: "Translate to Arabic",
    title: "How to play",
    intro:
      "There are 7 colors, and 4 of them are correct. You must pay close attention to the correct colors, and the answer will appear in the right-hand section according to the following colors.",
    red: 'If the opposite color is <strong style="color: red;">red</strong>, this means that the color you selected does not exist.',
    yellow:
      'If the opposite color is <strong style="color: yellow;">yellow</strong>, this means that the color you selected is present but in the wrong place.',
    green:
      'If the opposite color is <strong style="color: #22c55e;">green</strong>, it means the color you selected is in the correct place.',
  },
  ar: {
    btn: "الترجمة إلى الإنجليزية",
    title: "كيفية اللعب",
    intro:
      "هناك 7 ألوان، و4 منها صحيحة. يجب أن تنتبه جيداً للألوان الصحيحة، وستظهر الإجابة في القسم الأيمن وفقاً للألوان التالية.",
    red: 'إذا كان اللون المقابل <strong style="color: red;">أحمر</strong>، فهذا يعني أن اللون الذي اخترته غير موجود.',
    yellow:
      'إذا كان اللون المقابل <strong style="color: yellow;">أصفر</strong>، فهذا يعني أن اللون الذي اخترته موجود ولكن في المكان الخطأ.',
    green:
      'إذا كان اللون المقابل <strong style="color: #22c55e;">أخضر</strong>، فهذا يعني أن اللون الذي اخترته في المكان الصحيح.',
  },
};

let currentLanguage = "en";

const translateBtn = document.getElementById("translateBtn");
const ruleTitle = document.getElementById("ruleTitle");
const ruleIntro = document.getElementById("ruleIntro");
const ruleRed = document.getElementById("ruleRed");
const ruleYellow = document.getElementById("ruleYellow");
const ruleGreen = document.getElementById("ruleGreen");

function toggleLanguage(lang) {
  if (translateBtn) translateBtn.textContent = pageTranslations[lang].btn;
  if (ruleTitle) ruleTitle.textContent = pageTranslations[lang].title;
  if (ruleIntro) ruleIntro.textContent = pageTranslations[lang].intro;
  if (ruleRed) ruleRed.innerHTML = pageTranslations[lang].red;
  if (ruleYellow) ruleYellow.innerHTML = pageTranslations[lang].yellow;
  if (ruleGreen) ruleGreen.innerHTML = pageTranslations[lang].green;

  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

if (translateBtn) {
  translateBtn.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    toggleLanguage(currentLanguage);
  });
}
