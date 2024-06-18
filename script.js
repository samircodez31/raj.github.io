document.addEventListener('DOMContentLoaded', function() {
    const quizPopup = document.getElementById('quizPopup');
    const gameOverPopup = document.getElementById('gameOverPopup');
    const gameButton = document.getElementById('gameButton');
    const closeButtons = document.querySelectorAll('.close');
    const musicToggle = document.getElementById('toggleMusic');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const balloonsContainer = document.getElementById('balloons-container');
    const heartsContainer = document.getElementById('hearts-container');

    let score = 0;
    let currentQuestionIndex = 0;

    const questions = [
        {
            question: "What's my Real Name?",
            answers: ["Sammy", "Samir", "Harami", "Zelix"],
            correctAnswer: "Samir"
        },
        {
            question: "Which Server was our First Meetup Server?",
            answers: ["PixieRewards", "PixieSmp", "EvoHeart", "PixelMania"],
            correctAnswer: "PixieRewards"
        },
        {
            question: "What is my favorite color?",
            answers: ["Blue", "Red", "Green", "Yellow"],
            correctAnswer: "Green"
        },
        {
            question: "Which is my favorite season?",
            answers: ["Spring", "Summer", "None", "Winter"],
            correctAnswer: "None"
        },
        {
            question: "What's my favorite food?",
            answers: ["Pizza", "Maasu", "Burger", "Pasta"],
            correctAnswer: "Maasu"
        },
        {
            question: "Which Country i belongs to?",
            answers: ["Nepal", "India", "UAE", "Maldives"],
            correctAnswer: "Nepal"
        },
        {
            question: "What's my Dream to be?",
            answers: ["Actor", "Programmer", "Engineer", "Londiyabaaz"],
            correctAnswer: "Programmer"
        },
        {
            question: "Whats My Device Company?",
            answers: ["Oppo", "Vivo", "Iphone", "Samsung"],
            correctAnswer: "Vivo"
        },
        {
            question: "Which is my Hobby?",
            answers: ["Football", "Coding", "Londiyabaaz", "Swimming"],
            correctAnswer: "Coding"
        }
        // Add more questions as needed
    ];


    // Function to start the quiz
    function startQuiz() {
        displayQuestion(questions[currentQuestionIndex]);
        quizPopup.style.display = 'block';
    }

    // Display current question
    function displayQuestion(question) {
        const quizForm = document.getElementById('quizForm');
        quizForm.innerHTML = `
      <h3>${question.question}</h3>
      ${question.answers.map(answer => `
        <label>
          <input type="radio" name="answer" value="${answer}">
          ${answer}
        </label><br>
      `).join('')}
      <br>
      <button type="submit">Submit Answer</button>
    `;
        quizForm.addEventListener('submit', checkAnswer);
    }

    // Check selected answer
    function checkAnswer(event) {
        event.preventDefault();
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) return; // Do nothing if no answer selected

        if (selectedAnswer.value === questions[currentQuestionIndex].correctAnswer) {
            score++;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            showGameOver();
        }
    }

    // Show game over popup with final score
    function showGameOver() {
        const scoreDisplay = document.getElementById('score');
        const totalQuestionsDisplay = document.getElementById('totalQuestions');
        scoreDisplay.textContent = score;
        totalQuestionsDisplay.textContent = questions.length;
        quizPopup.style.display = 'none';
        gameOverPopup.style.display = 'block';
    }

    // Event listeners
    gameButton.addEventListener('click', startQuiz);
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            quizPopup.style.display = 'none';
            gameOverPopup.style.display = 'none';
        });
    });

    musicToggle.addEventListener('change', function() {
        if (musicToggle.checked) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });

    // Function to create balloons and hearts
    function createBalloonsAndHearts() {
        const balloonTypes = ['balloon1', 'balloon2', 'balloon3'];
        const heartTypes = ['heart1', 'heart2', 'heart3'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const balloon = document.createElement('div');
                const heart = document.createElement('div');

                balloon.classList.add('balloon', balloonTypes[Math.floor(Math.random() * balloonTypes.length)]);
                heart.classList.add('heart', heartTypes[Math.floor(Math.random() * heartTypes.length)]);

                balloon.style.left = `${Math.random() * 100}vw`;
                heart.style.left = `${Math.random() * 100}vw`;

                balloonsContainer.appendChild(balloon);
                heartsContainer.appendChild(heart);

                setTimeout(() => {
                    balloon.remove();
                    heart.remove();
                }, 8000);
            }, i * 3000);
        }
    }

    // Start animations on page load
    createBalloonsAndHearts();
});
