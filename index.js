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

let score = 0;
let quistions = [];
let i = 0;
let imgIndex;
let playSound = true;
const clickSound = new Audio("sounds/click.wav");

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
    } else audio.muted = false;
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
  console.log(
    `lenght is ${quistions.length} score is ${score} befote else num ${
      Math.floor((quistions.length + 1) / 2) - 1
    }`
  );
  if (score === quistions.length + 1) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `ممتاز! لقد جاوبت علي جميع الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML =
      "<p>انت من اكبر معجبين فلوبا وتتمني لقائه</p>";
  } else if (
    score === quistions.length + 1 - 2 ||
    score === quistions.length + 1 - 3
  ) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `جيد جدا! لقد جاوبت علي اغلب الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML =
      "<p>انت تعرف الكثير عن فلوبا عمل جيد</p>";
  } else if (
    score === quistions.length + 1 - 4 ||
    score === quistions.length + 1 - 5
  ) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `مقبول! لقد جاوبت علي عدد قليل من الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML = "<p>تحتاج الي تعلم المزيد عن فلوبا</p>";
  } else if (
    score <= Math.floor((quistions.length + 1) / 2) - 1 ||
    score <= Math.floor((quistions.length + 1) / 2) + 1
  ) {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = `سيئ! لقد جاوبت علي عدد قليل جدا من الاسئلة بشكل صحيح بجموع نقاط يساوي ${score} نقطه`;

    qustionsButtonsSection.innerHTML = "<p>هل تعرف من هو فلوبا من الاساس ؟</p>";
  } else {
    qustionsButtonsSection.innerHTML = "";
    quistionTitle.innerHTML = "";
    h2.innerHTML = ` حدث خطأ في محاولة حساب نتيجتك لكنك حصلت علي نقطه ${score} `;

    qustionsButtonsSection.innerHTML = "<p>الرجاء المحاوله مره اخري</p>";
  }

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
      h2.innerHTML = quistions[index - 1].title;
      buttons[randomIndex[0]].innerHTML = quistions[index - 1].true;
      buttons[randomIndex[0]].setAttribute("id", "true");
      buttons[randomIndex[1]].innerHTML = quistions[index - 1].btn2;
      buttons[randomIndex[2]].innerHTML = quistions[index - 1].btn3;
    }, 515);
  }
}

function onClick() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(
        `quistoin enght is ${quistions.length} qNum is ${qNum[0].innerHTML}`
      );
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

          next(i);
          randomBackground();
          setTimeout(fadeIn, 500);

          qNum[0].innerHTML++;
          console.log(score);
        } else {
          document
            .getElementsByClassName("fristQuistion")[0]
            .setAttribute("id", "");
          i++;
          randomIndex = randomChoice();

          next(i);
          randomBackground();
          setTimeout(fadeIn, 500);

          qNum[0].innerHTML++;
        }
      }, 100);
    });
  });
}

start();

onClick();

settings();

audio.onload = audio.play();
