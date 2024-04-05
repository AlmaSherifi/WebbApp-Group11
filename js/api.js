
document.addEventListener('DOMContentLoaded', () => {
    const startQuizButton = document.getElementById('start-quiz-button');
    const questionContainer = document.getElementById('question-container');
    const totalAnsweredSpan = document.getElementById('total-answered');
    const correctAnswersSpan = document.getElementById('rätta-svar');
    const incorrectAnswersSpan = document.getElementById('fela-svar');
    let shuffledQuestions, currentQuestionIndex = 0;
    let totalQuestionsAnswered = parseInt(localStorage.getItem('totalQuestionsAnswered') || '0');
    let rättaSvar = parseInt(localStorage.getItem('rättaSvar') || '0');
    let felaSvar = parseInt(localStorage.getItem('felaSvar') || '0');

    async function fetchQuestions() {
        try {
            const response = await fetch('https://da-demo.github.io/api/futurama/questions/');
            const questions = await response.json();
            shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 10);
        } catch (error) {
            console.error('Failed to fetch questions:', error);

(async () => {
    try {
        const questionsResponse = await fetch('https://da-demo.github.io/api/futurama/questions/');
        const questionsData = await questionsResponse.json();        

        const shuffledQuestions = questionsData.slice(0, 10);

        const questionContainer = document.getElementById('question-container');
        const startQuizButton = document.getElementById('start-quiz-button');

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next question';
        nextButton.style.display = 'none';
        nextButton.classList.add('btn', 'btn-primary');
        nextButton.id = 'next-button';

        let currentQuestionIndex = 0;
        let harBesvarats = false;

        let rättaSvar = localStorage.getItem('rättaSvar') ? parseInt(localStorage.getItem('rättaSvar')) : 0;
        let felaSvar = localStorage.getItem('felaSvar') ? parseInt(localStorage.getItem('felaSvar')) : 0;
        let totalaFrågor = localStorage.getItem('totalaFrågor') ? parseInt(localStorage.getItem('totalaFrågor')) : 0;

        document.getElementById('rätta-svar').innerText = rättaSvar;
        document.getElementById('fela-svar').innerText = felaSvar;
        document.getElementById('totala-frågor').innerText = totalaFrågor;

        function uppdateraStatistik(rätt) {
            if (!harBesvarats) {
                totalaFrågor++;
                if (rätt) {
                    rättaSvar++;
                } else {
                    felaSvar++;
                }
                localStorage.setItem('totalaFrågor', totalaFrågor);
                localStorage.setItem('rättaSvar', rättaSvar);
                localStorage.setItem('felaSvar', felaSvar);
                
                document.getElementById('rätta-svar').innerText = rättaSvar;
                document.getElementById('fela-svar').innerText = felaSvar;
                document.getElementById('totala-frågor').innerText = totalaFrågor;
                
                harBesvarats = true;
                nextButton.disabled = false;
            }
        }

        function displayQuestion(question) {
            harBesvarats = false;
            questionContainer.innerHTML = '';
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `<h2>Question ${currentQuestionIndex + 1}:</h2><p>${question.question}</p>`;

            question.possibleAnswers.forEach(answer => {
                const answerButton = document.createElement('button');
                answerButton.classList.add('btn', 'btn-primary', 'answer-button');
                answerButton.textContent = answer;
                answerButton.onclick = () => checkAnswer(answer, question.correctAnswer, question.possibleAnswers);
                questionElement.appendChild(answerButton);
            });

            questionContainer.appendChild(questionElement);
            questionContainer.appendChild(nextButton);
            nextButton.style.display = 'block';

        }
    }


    function displayQuestion(question) {
        resetState();
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `<h2>Question ${currentQuestionIndex + 1}:</h2><p>${question.question}</p>`;
        
        question.possibleAnswers.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.classList.add('btn', 'btn-primary', 'answer-button');
            answerButton.textContent = answer;
            answerButton.addEventListener('click', () => checkAnswer(answer, question.correctAnswer));
            questionElement.appendChild(answerButton);
        });

        questionContainer.appendChild(questionElement);
    }

    function checkAnswer(selectedAnswer, correctAnswer) {
        const answerButtons = document.querySelectorAll('.answer-button');
        answerButtons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correctAnswer) {
                btn.classList.add('btn-success');
            } else {
                btn.classList.add('btn-danger');
            }
        });

        const rätt = selectedAnswer === correctAnswer;
        updateStatistics(rätt);
        setTimeout(() => {
            if (currentQuestionIndex + 1 < shuffledQuestions.length) {
                currentQuestionIndex++;
                displayQuestion(shuffledQuestions[currentQuestionIndex]);
            } else {
                showResults();
            }
        }, 1000);
    }

    function updateStatistics(rätt) {
        totalQuestionsAnswered++;
        if (rätt) {
            rättaSvar++;
        } else {
            felaSvar++;
        }
        localStorage.setItem('totalQuestionsAnswered', totalQuestionsAnswered.toString());
        localStorage.setItem('rättaSvar', rättaSvar.toString());
        localStorage.setItem('felaSvar', felaSvar.toString());
        updateStatisticsDisplay();
    }

    function updateStatisticsDisplay() {
        totalAnsweredSpan.textContent = totalQuestionsAnswered;
        correctAnswersSpan.textContent = rättaSvar;
        incorrectAnswersSpan.textContent = felaSvar;
    }

    function showResults() {
        questionContainer.innerHTML = 
        `<h2>Quiz Completed!</h2>
        <p>Correct Answers: ${rättaSvar}</p>
        <p>Incorrect Answers: ${felaSvar}</p>
        <button id='restart-quiz' class='btn btn-primary'>Restart Quiz</button>`;
        const restartQuizButton = document.getElementById('restart-quiz');
        restartQuizButton.addEventListener('click', () => {
            startQuiz();
        });
    }

    function resetState() {
        questionContainer.innerHTML = '';
    }

    async function startQuiz() {
        totalQuestionsAnswered = 0;
        rättaSvar = 0;
        felaSvar = 0;
        currentQuestionIndex = 0;
        await fetchQuestions();
        if (shuffledQuestions && shuffledQuestions.length > 0) {
            displayQuestion(shuffledQuestions[currentQuestionIndex]);
            startQuizButton.style.display = 'none'; // Hide the start button during the quiz
        } else {
            questionContainer.textContent = 'Unable to load questions. Please try again later.';
        }
        updateStatisticsDisplay(); // Initialize or reset the statistics display
    }

    startQuizButton.addEventListener('click', startQuiz);
    // Initialize UI with saved stats on document ready
    updateStatisticsDisplay();
});

        function checkAnswer(selectedAnswer, correctAnswer, possibleAnswers) {
            const answerButtons = document.querySelectorAll('.answer-button');
            answerButtons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.style.backgroundColor = 'green';
                } else {
                    btn.style.backgroundColor = 'red';
                }
                btn.disabled = true;
            });
            uppdateraStatistik(selectedAnswer === correctAnswer);
        }

        startQuizButton.addEventListener('click', () => {
            startQuizButton.style.display = 'none';
            displayQuestion(shuffledQuestions[currentQuestionIndex]);
        });

        nextButton.addEventListener('click', () => {
            if (currentQuestionIndex + 1 < shuffledQuestions.length) {
                currentQuestionIndex++;
                displayQuestion(shuffledQuestions[currentQuestionIndex]);
                nextButton.disabled = true; // The user must choose an answer for the new question
            } else {
                // Enhanced completion message with statistics
                const resultatMeddelande = `<p>You have completed the quiz!</p>
                    <p>Total Questions Answered: ${totalaFrågor}</p>
                    <p>Correct Answers: ${rättaSvar}</p>
                    <p>Incorrect Answers: ${felaSvar}</p>`;
                questionContainer.innerHTML = resultatMeddelande;
                nextButton.style.display = 'none';
                startQuizButton.textContent = 'Restart Quiz';
                startQuizButton.style.display = 'block';
                startQuizButton.onclick = () => location.reload(); // Add a simple way to restart the quiz
            }
        });

    } catch (error) {
        console.error("A mistake occurred:", error);
    }
})();

