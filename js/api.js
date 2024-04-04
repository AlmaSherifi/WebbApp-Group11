(async () => {
    try {
        // Hämta frågor och svarsalternativ från API
        const questionsResponse = await fetch('https://da-demo.github.io/api/futurama/questions/');
        const questionsData = await questionsResponse.json();        

        // Begränsar antalet frågor till 10 och blandar dem
        const shuffledQuestions = questionsData.slice(0, 10);

        // Referens till HTML-elementen
        const questionContainer = document.getElementById('question-container');
        const startQuizButton = document.getElementById('start-quiz-button');

        // Skapa en knapp för att gå vidare till nästa fråga
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next question';
        nextButton.style.display = 'none'; // Göm knappen i början
        nextButton.classList.add('btn', 'btn-primary');
        nextButton.id = 'next-button';

        let currentQuestionIndex = 0; // Håller koll på index för den aktuella frågan

        // Funktion för att visa en fråga
        function displayQuestion(question) {
            // Rensa tidigare innehåll
            questionContainer.innerHTML = '';

            // Skapa frågeelement
            const questionElement = document.createElement('div');
            questionElement.classList.add('question');
            questionElement.innerHTML = `
                <h2>Question ${currentQuestionIndex + 1}:</h2>
                <p>${question.question}</p>
            `;

            // Skapa svarsalternativ för frågan
            const answersContainer = document.createElement('div');
            answersContainer.classList.add('answers-container');
            const answerButtons = []; // Skapa en array för att lagra referenser till knapparna
            question.possibleAnswers.forEach(answer => {
                const answerButton = document.createElement('button');
                answerButton.classList.add('btn', 'btn-primary');
                answerButton.textContent = answer;

                // Lägg till händelselyssnare för svarsalternativ
                answerButton.addEventListener('click', () => {
                    checkAnswer(answer, question.correctAnswer, answerButtons);
                    nextButton.disabled = false;
                });

                answersContainer.appendChild(answerButton);
                answerButtons.push(answerButton); // Lägg till knappen i arrayen
            });

            questionElement.appendChild(answersContainer);
            questionContainer.appendChild(questionElement);
            questionContainer.appendChild(nextButton); // Flytta knappen för nästa fråga inuti questionContainer
        }

        // Funktion för att starta quiz
        function StartQuiz() {
            startQuizButton.style.display = 'none'; // Göm startknappen när quizen börjar
            displayQuestion(shuffledQuestions[currentQuestionIndex]);
            nextButton.style.display = 'block'; // Visa knappen när användaren startar quizen
            nextButton.disabled = true; // Inaktivera knappen tills användaren väljer ett svar
        }

        // Funktion för att kontrollera svaret
        function checkAnswer(selectedAnswer, correctAnswer, answerButtons) {
            answerButtons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.style.backgroundColor = 'green';
                } else {
                    btn.style.backgroundColor = 'red';
                }
            });
        }

        // Funktion för att gå vidare till nästa fråga
        function goToNextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < shuffledQuestions.length) {
                displayQuestion(shuffledQuestions[currentQuestionIndex]);
                nextButton.disabled = true; // Inaktivera knappen tills användaren väljer ett svar för nästa fråga
            } else {
                alert('Du har besvarat alla frågor!');
            }
        }

        // Lägg till händelselyssnare för knappen för nästa fråga
        nextButton.addEventListener('click', goToNextQuestion);

        // Lägg till händelselyssnare för startknappen
        startQuizButton.addEventListener('click', StartQuiz);

    } catch (error) {
        console.error("Ett fel inträffade:", error);
    }
})();

