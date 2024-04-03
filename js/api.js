/*(async () => {
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
})(); */

/*
(async () => {
    try {
        // Hämta frågor och svarsalternativ från API
        const questionsResponse = await fetch('https://da-demo.github.io/api/futurama/questions/');
        const questionsData = await questionsResponse.json();
        
        // Funktion för att visa första frågan
        const showFirstQuestion = () => {
            // Hämta elementet för frågan i HTML
            const questionHeader = document.getElementById('question');
            
            // Fyll innehållet med frågan från API
            questionHeader.textContent = questionsData[0].question; // Första frågan i listan
            
            // Hämta elementet för svarsalternativen i HTML
            const answersList = document.getElementById('answers');

            // Loopa igenom varje svarsalternativ och skapa HTML-element för dem
            questionsData[0].possibleAnswers.forEach((answer, index) => {
                // Skapa ett li-element för svarsalternativet
                const answerItem = document.createElement('li');
                answerItem.textContent = `${String.fromCharCode(65 + index)}. ${answer}`; // Använd A, B, C, D som alternativsnummer

                // Lägg till svarsalternativet till ul-elementet
                answersList.appendChild(answerItem);
            });
        };
        
        // Hitta elementet för knappen "Start Quiz" i HTML
        const startQuizButton = document.getElementById('start-quiz-button');
        
        // Lägg till en eventlyssnare på knappen som kör funktionen för att visa första frågan
        startQuizButton.addEventListener('click', showFirstQuestion);
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
})(); */

(async () => {
    
    try {
        // Hämta frågor och svarsalternativ från API
        const questionsResponse = await fetch('https://da-demo.github.io/api/futurama/questions/');
        const questionsData = await questionsResponse.json();        

        const startQuizButton = document.getElementById('start-quiz-button');       
        startQuizButton.addEventListener('click', () => StartQuiz(questionsData));
        
        
        // Funktion för att visa första frågan
        /*const showFirstQuestion = () => {
            // Hämta elementet för frågan i HTML
            const questionHeader = document.getElementById('question');
            
            // Fyll innehållet med frågan från API
            questionHeader.textContent = questionsData[0].question; // Första frågan i listan
            
            // Hämta elementet för svarsalternativen i HTML
            const answersList = document.getElementById('answers');

            // Loopa igenom varje svarsalternativ och skapa HTML-element för dem
            questionsData[0].possibleAnswers.forEach((answer, index) => {
                // Skapa ett li-element för svarsalternativet
                const answerItem = document.createElement('li');
                
                // Skapa ett input-element för radioknappen
                const radioButton = document.createElement('input');
                radioButton.type = 'radio';
                radioButton.name = 'answer'; // Namnet ska vara samma för alla alternativ i en fråga
                
                const answerLabel = document.createElement('label');
                answerLabel.textContent = `${String.fromCharCode(65 + index)}. ${answer}`; // Använd A, B, C, D som alternativsnummer, om index är 0 så menas det med A osv.

                //döljer startquiz knappen när man startar quizet
                const startQuizButton = document.getElementById('start-quiz-button');
                startQuizButton.style.display = 'none';
                
                // Lägg till radioknappen och labeln i li-elementet
                answerItem.appendChild(radioButton);
                answerItem.appendChild(answerLabel);

                // Lägg till svarsalternativet till ul-elementet
                answersList.appendChild(answerItem);
                
            });
        };*/
        
        /*const startQuizButton = document.getElementById('start-quiz-button');       
        startQuizButton.addEventListener('click', showFirstQuestion(questionsData));*/        
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
    
})();

//Startar Quizzet
function StartQuiz(data){
    let question_counter = 0;
    //Så att första frågan kommer upp
    question_counter = CreateQuestionPage(data, question_counter);
    const nextBtn = document.getElementById('Answear-Button');
    ChangeNextBtnClasses(nextBtn);
    nextBtn.addEventListener('click', () => {
        if(CheckIfAnswearIsSelected()){
            CreateQuestionPage(data, question_counter)
            question_counter++;
        }
        
    });
}
//Ändrar utseendet på NextQuestion Knappen
function ChangeNextBtnClasses(btn){
    btn.classList.remove("collapse");
    btn.classList.add("btn");
    btn.classList.add("btn-secondary");
}

//Kollar om något svar är valdt
function CheckIfAnswearIsSelected(){
    //Hämtar alla radiobuttons
    const radioButtons = document.querySelectorAll('input[type="radio"][name="answer"');
    let selected = false;

    //Går igenom alla för att se om de är valda
    radioButtons.forEach((btn) =>{        
        if(btn.checked){
            selected = true;            
        }
    })
    //Om ingen är vald skapar den ett error message
    if(!selected){
        const messageParent = document.getElementById('button-container');
        //Kollar om det finns ett error message        
        const existingMessage = document.getElementById('answer-validation');
        //tar bort förgående error message
        if(existingMessage){
            messageParent.removeChild(existingMessage);
        }

        //Skapar error message och appendar det till button-container
        const message = document.createElement("div");
        message.id = "answer-validation";
        message.innerHTML = "Please select an answear";
        messageParent.appendChild(message)
        return false;
    }
    //tar bort förgående error message om man svarar korrekt
    const existingMessage = document.getElementById('answer-validation');
    if (existingMessage) {
        existingMessage.remove();
    }
    return true;
}


function CreateQuestionPage(data, counter){
    // Hämta elementet för frågan i HTML
    const questionHeader = document.getElementById('question');
            
    // Fyll innehållet med frågan från API
    questionHeader.textContent = data[counter].question; // Första frågan i listan
    
    // Hämta elementet för svarsalternativen i HTML
    const answersList = document.getElementById('answers');

    //Tar bort alla förgående children från förra frågan
    while(answersList.firstChild){
        answersList.removeChild(answersList.firstChild);
    }
    // Loopa igenom varje svarsalternativ och skapa HTML-element för dem
    data[counter].possibleAnswers.forEach((answer, index) => {

        // Skapa ett li-element för svarsalternativet
        const answerItem = document.createElement('li');
        
        // Skapa ett input-element för radioknappen
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'answer'; // Namnet ska vara samma för alla alternativ i en fråga
        
        const answerLabel = document.createElement('label');
        answerLabel.textContent = `${String.fromCharCode(65 + index)}. ${answer}`; // Använd A, B, C, D som alternativsnummer, om index är 0 så menas det med A osv.

        //döljer startquiz knappen när man startar quizet
        const startQuizButton = document.getElementById('start-quiz-button');
        startQuizButton.style.display = 'none';
        
        // Lägg till radioknappen och labeln i li-elementet
        answerItem.appendChild(radioButton);
        answerItem.appendChild(answerLabel);

        // Lägg till svarsalternativet till ul-elementet
        answersList.appendChild(answerItem);        
    });
    return Increment_QuestionCounter(counter);
}

//Ökar countern för vilken fråga som ska visas
function Increment_QuestionCounter(counter){
    return counter + 1;
}
