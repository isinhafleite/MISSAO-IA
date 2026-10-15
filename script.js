const questions = [
    {
        question: "1. Qual é a capital do Brasil?",
        answers: ["Brasília", "São Paulo"],
        correct: 0
    },
    {
        question: "2. Qual planeta é conhecido como Planeta Vermelho?",
        answers: ["Vênus", "Marte"],
        correct: 1
    },
    {
        question: "3. Quanto é 5 + 5?",
        answers: ["10", "15"],
        correct: 0
    },
    {
        question: "4. Qual destes animais é um mamífero?",
        answers: ["Tubarão", "Golfinho"],
        correct: 1
    },
    {
        question: "5. Quantos dias tem uma semana?",
        answers: ["7 dias", "10 dias"],
        correct: 0
    }
];

const questionNumber = document.getElementById("question-number");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress-bar");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

let currentQuestion = 0;
let points = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    questionElement.textContent = question.question;
    feedbackElement.textContent = "";
    answersElement.innerHTML = "";

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.disabled = true;

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-button");
        button.type = "button";

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";
}

function selectAnswer(selectedIndex, selectedButton) {
    if (answered) return;

    answered = true;

    const question = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;
    });

    selectedButton.classList.add("selected");

    if (selectedIndex === question.correct) {
        points++;
        feedbackElement.textContent = "Resposta correta!";
    } else {
        feedbackElement.textContent = "Resposta registrada!";
    }

    nextButton.disabled = false;
}

function showResult() {
    quizElement.hidden = true;
    questionNumber.hidden = true;
    resultElement.hidden = false;

    scoreElement.textContent =
        `Você acertou ${points} de ${questions.length} perguntas!`;

    progressBar.style.width = "100%";
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    points = 0;

    resultElement.hidden = true;
    quizElement.hidden = false;
    questionNumber.hidden = false;

    showQuestion();
});

showQuestion();