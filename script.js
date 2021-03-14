"use strict";

class Question {
  constructor(question, a, b, c) {
    this.question = question;
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Questions {
  questions = [];
  score = 0;

  answered1 = false;
  answered2 = false;
  answered3 = false;

  constructor() {
    this.loadFromLocalStorage();

    if (location.pathname === "/edit.html") {
      this.initAddQuestion();
      this.setInputs();
    }

    if (location.pathname === "/index.html") {
      this.setQuestions();
    }
    this.getUserAnswer();
  }
  loadFromLocalStorage() {
    this.localQuestion1 = JSON.parse(localStorage.getItem("question1"));
    this.localQuestion2 = JSON.parse(localStorage.getItem("question2"));
    this.localQuestion3 = JSON.parse(localStorage.getItem("question3"));
  }
  saveInLocalStorage() {
    localStorage.setItem(`question1`, JSON.stringify(this.questions[0]));
    localStorage.setItem(`question2`, JSON.stringify(this.questions[1]));
    localStorage.setItem(`question3`, JSON.stringify(this.questions[2]));
  }

  setInputs() {
    document.querySelector(".question1").value = this.localQuestion1.question;
    document.querySelector(
      ".question1-first-answer-input"
    ).value = this.localQuestion1.a;
    document.querySelector(
      ".question1-first-answer-input"
    ).value = this.localQuestion1.a;
    document.querySelector(
      ".question1-second-answer-input"
    ).value = this.localQuestion1.b;
    document.querySelector(
      ".question1-third-answer-input"
    ).value = this.localQuestion1.c;

    ///
    document.querySelector(".question2").value = this.localQuestion2.question;
    document.querySelector(
      ".question2-first-answer-input"
    ).value = this.localQuestion2.a;
    document.querySelector(
      ".question2-first-answer-input"
    ).value = this.localQuestion2.a;
    document.querySelector(
      ".question2-second-answer-input"
    ).value = this.localQuestion2.b;
    document.querySelector(
      ".question2-third-answer-input"
    ).value = this.localQuestion2.c;

    ///

    document.querySelector(".question3").value = this.localQuestion3.question;
    document.querySelector(
      ".question3-first-answer-input"
    ).value = this.localQuestion3.a;
    document.querySelector(
      ".question3-first-answer-input"
    ).value = this.localQuestion3.a;
    document.querySelector(
      ".question3-second-answer-input"
    ).value = this.localQuestion3.b;
    document.querySelector(
      ".question3-third-answer-input"
    ).value = this.localQuestion3.c;
  }

  addQuestion() {
    this.questions = [];
    const question1 = document.querySelector(".question1").value;
    const question1answer1 = document.querySelector(
      ".question1-first-answer-input"
    ).value;
    const question1answer2 = document.querySelector(
      ".question1-second-answer-input"
    ).value;
    const question1answer3 = document.querySelector(
      ".question1-third-answer-input"
    ).value;
    const question2 = document.querySelector(".question2").value;
    const question2answer1 = document.querySelector(
      ".question2-first-answer-input"
    ).value;
    const question2answer2 = document.querySelector(
      ".question2-second-answer-input"
    ).value;
    const question2answer3 = document.querySelector(
      ".question2-third-answer-input"
    ).value;
    const question3 = document.querySelector(".question3").value;
    const question3answer1 = document.querySelector(
      ".question3-first-answer-input"
    ).value;
    const question3answer2 = document.querySelector(
      ".question3-second-answer-input"
    ).value;
    const question3answer3 = document.querySelector(
      ".question3-third-answer-input"
    ).value;

    const questionForForm1 = new Question(
      question1,
      question1answer1,
      question1answer2,
      question1answer3
    );
    const questionForForm2 = new Question(
      question2,
      question2answer1,
      question2answer2,
      question2answer3
    );
    const questionForForm3 = new Question(
      question3,
      question3answer1,
      question3answer2,
      question3answer3
    );
    if (!this.validateInputs()) {
      alert("Enter all required fields!");
      return;
    }
    this.questions.push(questionForForm1);
    this.questions.push(questionForForm2);
    this.questions.push(questionForForm3);
    this.saveInLocalStorage();
  }

  initAddQuestion() {
    document.querySelector(".save-btn").addEventListener("click", () => {
      this.addQuestion();
    });
  }

  setQuestions() {
    document.querySelector(
      "#question1"
    ).innerHTML = `Question 1.  ${this.localQuestion1.question}`;
    document.querySelector(
      "#question2"
    ).innerHTML = `Question 2.  ${this.localQuestion2.question}`;
    document.querySelector(
      "#question3"
    ).innerHTML = `Question 3.  ${this.localQuestion3.question}`;

    ///
    const answers1 = [
      this.localQuestion1.a,
      this.localQuestion1.b,
      this.localQuestion1.c,
    ];

    const answers2 = [
      this.localQuestion2.a,
      this.localQuestion2.b,
      this.localQuestion2.c,
    ];
    const answers3 = [
      this.localQuestion3.a,
      this.localQuestion3.b,
      this.localQuestion3.c,
    ];

    document.querySelector("#question1a").innerHTML = this.getRandomPosition(
      answers1
    );

    document.querySelector("#question1b").innerHTML = this.getRandomPosition(
      answers1
    );

    document.querySelector("#question1c").innerHTML = this.getRandomPosition(
      answers1
    );

    document.querySelector("#question2a").innerHTML = this.getRandomPosition(
      answers2
    );
    document.querySelector("#question2b").innerHTML = this.getRandomPosition(
      answers2
    );
    document.querySelector("#question2c").innerHTML = this.getRandomPosition(
      answers2
    );
    document.querySelector("#question3a").innerHTML = this.getRandomPosition(
      answers3
    );
    document.querySelector("#question3b").innerHTML = this.getRandomPosition(
      answers3
    );
    document.querySelector("#question3c").innerHTML = this.getRandomPosition(
      answers3
    );
  }

  validateInputs() {
    let ok = true;
    document
      .querySelectorAll(".question-input")
      .forEach(function (questionInput) {
        if (questionInput.value === "") {
          ok = false;
        }
      });
    document.querySelectorAll(".answer-input").forEach(function (answerInput) {
      if (answerInput.value === "") {
        ok = false;
      }
    });
    return ok;
  }

  getRandomPosition(questions = []) {
    const randomAnswerPosition = Math.floor(Math.random() * questions.length);
    const answer = questions[randomAnswerPosition];
    questions.splice(randomAnswerPosition, 1);
    return answer;
  }

  getUserAnswer() {
    document.querySelectorAll(".answer").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const questionIndex = btn.dataset.question;
        if (this[`answered${questionIndex}`] === false) {
          this[`answered${questionIndex}`] = true;
          if (this.checkAnswer(e.target.textContent)) {
            btn.classList.add("goodAnswer");
            this.score++;
          } else {
            btn.classList.add("badAnswer");
            this.score;
          }
          document.querySelector(
            ".score"
          ).textContent = `Score: ${this.score}/3`;
        }
      });
    });
  }

  checkAnswer(userAnswer) {
    if (
      userAnswer === this.localQuestion1.a ||
      userAnswer === this.localQuestion2.a ||
      userAnswer === this.localQuestion3.a
    )
      return true;
    return false;
  }
}

const questions = new Questions();
