const questions = [
    
    {
        question:"Entomology is the science that studies?",
        answers: [
            { text: "largest railway station", correct : true},
            { text: "highest railway station", correct : false},
            { text: "longest railway station", correct : false},
            { text: "None of the above", correct : false},
        ]
    },
    {
        question:"For which of the following disciplines is Nobel Prize awarded?",
        answers: [
            { text: "Physics and Chemistry", correct : false},
            { text: "Physiology or Medicine", correct : false},
            { text: "Literature, Peace and Economics", correct : false},
            { text: "All of the above", correct : true},
        ]  
    },
    {
        question:"Galileo was an Italian astronomer who?",
        answers: [
            { text: "developed the telescope", correct : false},
            { text: "discovered four satellites of Jupiter", correct : false},
            { text: "discovered that the movement of pendulum produces a regular time measurement", correct : false},
            { text: "All of the above", correct : true},
        ]  
    },
    {
        question:"Film and TV institute of India is located at?",
        answers: [
            { text: "Rajkot (Gujarat)", correct : false},
            { text: "Pune (Maharashtra)", correct : true},
            { text: "Pimpri (Maharashtra)", correct : false},
            { text: "Perambur (Tamilnadu)", correct : false},
        ]  
    },
    {
        question:"Gopal Krishna Gokhale",
        answers: [
            { text: "served as President of the Indian National Congress in 1905", correct : false},
            { text: "All of the above", correct : true},
            { text: "founded the servants of India Society", correct : false},
            { text: "started as a maths teacher and rose to the position of the principal of Ferguson College, Pune", correct : false},
        ]  
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

 function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        score++;
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();