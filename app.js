document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');

    let shuffledQuestions, currentQuestionIndex;
    let score = 0;

    const questions = [
        {
            question: "¿Cuál es la capital de Francia?",
            answers: [
                { text: "Madrid", correct: false },
                { text: "París", correct: true },
                { text: "Roma", correct: false },
                { text: "Londres", correct: false }
            ]
        },
        {
            question: "¿Cuál es el río más largo del mundo?",
            answers: [
                { text: "Nilo", correct: true },
                { text: "Amazonas", correct: false },
                { text: "Yangtsé", correct: false },
                { text: "Misisipi", correct: false }
            ]
        },
        {
            question: "¿Cuál es el planeta más grande del sistema solar?",
            answers: [
                { text: "Marte", correct: false },
                { text: "Tierra", correct: false },
                { text: "Júpiter", correct: true },
                { text: "Saturno", correct: false }
            ]
        },
        {
            question: "¿En qué año llegó el hombre a la luna?",
            answers: [
                { text: "1965", correct: false },
                { text: "1969", correct: true },
                { text: "1971", correct: false },
                { text: "1973", correct: false }
            ]
        },
        {
            question: "¿Cuál es el idioma más hablado en el mundo?",
            answers: [
                { text: "Inglés", correct: false },
                { text: "Español", correct: false },
                { text: "Chino Mandarín", correct: true },
                { text: "Hindú", correct: false }
            ]
        },
        {
            question: "¿Cuál es el océano más grande del mundo?",
            answers: [
                { text: "Atlántico", correct: false },
                { text: "Índico", correct: false },
                { text: "Pacífico", correct: true },
                { text: "Ártico", correct: false }
            ]
        },
        {
            question: "¿Cuál es el país con mayor población del mundo?",
            answers: [
                { text: "India", correct: false },
                { text: "Estados Unidos", correct: false },
                { text: "China", correct: true },
                { text: "Indonesia", correct: false }
            ]
        },
        {
            question: "¿Qué invento revolucionó las comunicaciones en el siglo XIX?",
            answers: [
                { text: "El teléfono", correct: true },
                { text: "La televisión", correct: false },
                { text: "El automóvil", correct: false },
                { text: "El avión", correct: false }
            ]
        },
        {
            question: "¿Cuál es el metal más abundante en la corteza terrestre?",
            answers: [
                { text: "Hierro", correct: false },
                { text: "Aluminio", correct: true },
                { text: "Cobre", correct: false },
                { text: "Plata", correct: false }
            ]
        },
        {
            question: "¿En qué continente se encuentra el desierto del Sahara?",
            answers: [
                { text: "Asia", correct: false },
                { text: "América", correct: false },
                { text: "África", correct: true },
                { text: "Oceanía", correct: false }
            ]
        },
        {
            question: "¿Cuál es el animal terrestre más rápido?",
            answers: [
                { text: "León", correct: false },
                { text: "Gacela", correct: false },
                { text: "Guepardo", correct: true },
                { text: "Caballo", correct: false }
            ]
        },
        {
            question: "¿Quién pintó la Mona Lisa?",
            answers: [
                { text: "Vincent van Gogh", correct: false },
                { text: "Pablo Picasso", correct: false },
                { text: "Leonardo da Vinci", correct: true },
                { text: "Claude Monet", correct: false }
            ]
        },
        {
            question: "¿Cuál es el país más grande del mundo?",
            answers: [
                { text: "Canadá", correct: false },
                { text: "China", correct: false },
                { text: "Estados Unidos", correct: false },
                { text: "Rusia", correct: true }
            ]
        },
        {
            question: "¿Cuál es la montaña más alta del mundo?",
            answers: [
                { text: "K2", correct: false },
                { text: "Kangchenjunga", correct: false },
                { text: "Everest", correct: true },
                { text: "Lhotse", correct: false }
            ]
        },
        {
            question: "¿Cuál es el elemento químico más abundante en el universo?",
            answers: [
                { text: "Oxígeno", correct: false },
                { text: "Hidrógeno", correct: true },
                { text: "Carbono", correct: false },
                { text: "Nitrógeno", correct: false }
            ]
        }
    ];

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    function startGame() {
        startButton.classList.add('hide');
        score = 0;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct === 'true';
        setStatusClass(selectedButton, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct === 'true');
        });
        if (correct) {
            score++;
        }
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = `Reiniciar (Puntuación: ${score})`;
            startButton.classList.remove('hide');
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }
});
