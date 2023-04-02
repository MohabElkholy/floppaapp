let buttons = document.querySelectorAll(".quistion-buttons");
let qNum = document.getElementsByClassName("qNum");
let h2 = document.querySelector("h2");
let html = document.querySelector("html");
let qustionsButtonsSection = document.querySelector(".btn-section");
let quistionTitle = document.querySelector(".quistionIndex");
let startButton = document.querySelector(".start");
let mainMenu = document.querySelector(".mainMenu");
let settingsBtn = document.querySelector(".gear-countainer");
let settingsMenu = document.querySelector(".settingsMenu");
let musicBtn = document.querySelector(".musicBtn");
let soundBtn = document.querySelector(".soundBtn");
let audio = document.querySelector("audio");
let overlay = document.querySelector(".overlay-black");
let main = document.querySelector("main");
let showFalseButton;
let backButton;

let score = 0;
let quistions = [];
let i = -1;
let imgIndex;
let playSound = true;
const clickSound = new Audio("sounds/click.wav");
let falseQuistions = [];
let uniqueNumbers = [];

fetch("./data.json")
  .then((response) => response.json())
  .then((json) =>
    json.forEach((quistion) => {
      quistions.push(quistion);
    })
  );

const randomChoice = () => {
  let randNum = Math.floor(Math.random() * (3 - 0)) + 0; //Generates a random number between 0 and 2
  let choiceNum;
  let remainingNum1;
  let remainingNum2;

  if (randNum === 0) {
    // Depending on the randomly generated number the function runs
    choiceNum = 0;
    remainingNum1 = 1;
    remainingNum2 = 2;
  } else if (randNum === 1) {
    choiceNum = 1;
    remainingNum1 = 0;
    remainingNum2 = 2;
  } else if (randNum === 2) {
    choiceNum = 2;
    remainingNum1 = 0;
    remainingNum2 = 1;
  }

  return [choiceNum, remainingNum1, remainingNum2];
};

let randomIndex = randomChoice();

buttons[1].setAttribute("id", "true");

function randomQutiosnIndex() {
  while (uniqueNumbers.length < quistions.length) {
    let randomNumber = Math.floor(Math.random() * quistions.length);
    if (!uniqueNumbers.includes(randomNumber)) {
      uniqueNumbers.push(randomNumber);
    }
  }
}
setTimeout(() => {
  randomQutiosnIndex();
}, 3000);

function fadeIn() {
  h2.style.opacity = 1;
  qustionsButtonsSection.style.opacity = 1;
}

function fadeOut() {
  h2.style.opacity = 0;
  qustionsButtonsSection.style.opacity = 0;
}

function settings() {
  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsMenu.classList.toggle("show");
  });

  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    musicBtn.classList.toggle("off");
    if (audio.muted === false) {
      audio.muted = true;
    } else {
      audio.muted = false;
      audio.play();
    }
  });
  soundBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    soundBtn.classList.toggle("off");
    if (playSound === true) {
      playSound = false;
    } else playSound = true;
  });
}

function randomBackground() {
  let randIndex = Math.floor(Math.random() * (11 - 1)) + 1;
  imgIndex = `url(images/${randIndex}.jpg)`;
  html.style.backgroundImage = imgIndex;
}

function start() {
  startButton.addEventListener("click", () => {
    if (playSound === true) {
      clickSound.play();
    }

    mainMenu.style.opacity = 0;
    setTimeout(() => {
      document.querySelector("body").removeChild(mainMenu);
    }, 300);
  });
}

function end() {
  overlay.classList.add("show");
  main.classList.add("z4");

  if (score === quistions.length + 1) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `ممتاز! لقد جاوبت علي جميع الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML =
      "<p>انت من اكبر معجبين فلوبا وتتمني لقائه</p>";
  } else if (
    score === quistions.length + 1 - 1 ||
    score === quistions.length + 1 - 2 ||
    score === quistions.length + 1 - 3
  ) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `جيد جدا! لقد جاوبت علي اغلب الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML = `<p>انت تعرف الكثير عن فلوبا عمل جيد</p><button class="showFalse">الاسئلة الخطأ</button>`;
  } else if (
    score === quistions.length + 1 - 4 ||
    score === quistions.length + 1 - 5
  ) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `مقبول! لقد جاوبت علي عدد قليل من الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML = `<p>تحتاج الي تعلم المزيد عن فلوبا</p><button class="showFalse">الاسئلة الخطأ</button>`;
  } else if (score <= Math.floor((quistions.length + 1) / 2)) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `سيئ! لقد جاوبت علي عدد قليل جدا من الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML = `<p>هل تعرف من هو فلوبا من الاساس ؟</p><button class="showFalse">الاسئلة الخطأ</button>`;
  } else {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = ` حدث خطأ في محاولة حساب نتيجتك لكنك حصلت علي نقطه ${score} `;

    qustionsButtonsSection.innerHTML = "<p>الرجاء المحاوله مره اخري</p>";
  }

  showFalseButton = document.querySelector(".showFalse");
  showFalse();
  setInterval(randomBackground, 3000);
}

function next(index) {
  fadeOut();
  if (document.getElementById("true")) {
    document.getElementById("true").setAttribute("id", "");
  }
  if (qNum[0].innerHTML - 1 === quistions.length) {
    end();
  } else {
    fadeOut();
    setTimeout(() => {
      h2.innerHTML = quistions[index].title;
      buttons[randomIndex[0]].innerHTML = quistions[index].true;
      buttons[randomIndex[0]].setAttribute("id", "true");
      buttons[randomIndex[1]].innerHTML = quistions[index].btn2;
      buttons[randomIndex[2]].innerHTML = quistions[index].btn3;
    }, 515);
  }
}

function onClick() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (playSound === true) {
        clickSound.play();
      }

      setTimeout(() => {
        if (button.id === "true") {
          fadeIn();
          document
            .getElementsByClassName("fristQuistion")[0]
            .setAttribute("id", "");
          score++;
          i++;
          randomIndex = randomChoice();

          next(uniqueNumbers[i]);
          randomBackground();
          setTimeout(fadeIn, 500);

          qNum[0].innerHTML++;
        } else {
          if (i === 0) {
            falseQuistions.push("ما هو سن فلوبا");
          } else falseQuistions.push(quistions[i - 1].title);

          document
            .getElementsByClassName("fristQuistion")[0]
            .setAttribute("id", "");
          i++;
          randomIndex = randomChoice();

          next(uniqueNumbers[i]);
          randomBackground();
          setTimeout(fadeIn, 500);

          qNum[0].innerHTML++;
        }
      }, 100);
    });
  });
}

function showFalse() {
  if (falseQuistions.length > 0) {
    showFalseButton.addEventListener("click", () => {
      qustionsButtonsSection.innerHTML = "";
      quistionTitle.innerHTML = "";
      h2.innerHTML = "";
      falseQuistions.forEach((falseQuistion) => {
        let child = document.createElement("p");
        child.innerText = falseQuistion;
        qustionsButtonsSection.appendChild(child);
      });
      let child2 = document.createElement("button");
      child2.innerText = "الرجوع";
      child2.classList.add("back");
      qustionsButtonsSection.appendChild(child2);
      back = document.querySelector(".back");
      back.addEventListener("click", () => {
        end();
      });
    });
  }
}

start();

onClick();

settings();
