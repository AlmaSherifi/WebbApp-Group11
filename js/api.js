(async () => {
    try {
        const questionsResponse = await fetch('https://da-demo.github.io/api/futurama/questions/');
        const questionsData = await questionsResponse.json();

        const questionContainer = document.getElementById('question-container');
      
        questionsData.forEach(questionObj => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');

            const questionHeader = document.createElement('h3');
            questionHeader.textContent = questionObj.question;

        
            questionDiv.appendChild(questionHeader);

 
            const answersList = document.createElement('ul');


            questionObj.possibleAnswers.forEach(answer => {
                const answerItem = document.createElement('li');
                answerItem.textContent = answer;
                answersList.appendChild(answerItem);
            });

            questionDiv.appendChild(answersList);

            questionContainer.appendChild(questionDiv);
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();