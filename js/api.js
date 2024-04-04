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
