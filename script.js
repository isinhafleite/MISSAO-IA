const questions = [
    {
        question: "Você já sabe qual faculdade quer cursar?",
        answers: [
            "Sim, já escolhi meu curso.",
            "Não, ainda estou em dúvida."
        ],
        correct: null
    },
    {
        question: "O que mais influencia sua escolha de carreira?",
        answers: [
            "Fazer algo de que gosto.",
            "Ter um bom salário e estabilidade financeira."
        ],
        correct: null
    },
    {
        question: "Você estudaria longe de casa para seguir seu sonho?",
        answers: [
            "Sim, iria atrás da minha oportunidade.",
            "Não, prefiro estudar perto de casa."
        ],
        correct: null
    },
    {
        question: "O que você prefere para seu futuro profissional?",
        answers: [
            "Trabalhar em uma empresa.",
            "Ter meu próprio negócio."
        ],
        correct: null
    },
    {
        question: "Como você escolheria sua carreira hoje?",
        answers: [
            "Seguir a carreira dos meus sonhos.",
            "Escolher uma carreira com mais oportunidades."
        ],
        correct: null
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