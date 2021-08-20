$(document).ready(function () {


    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    // request.open('GET', 'https://jservice.io/api/clues', true) old API with 10 clues
    request.open('GET', 'https://theansweris.app/database/clues.json', true)
    request.onload = function () {
    // Begin accessing JSON data here
    var clues = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        const randomClue = Math.floor(Math.random() * clues.length);    
        console.log("Clue number: " + randomClue);

        let clueQuestion = clues[randomClue].question,
            clueAnswer = clues[randomClue].answer,
            clueCat = clues[randomClue].category,
            clueVal = clues[randomClue].value;
        /*
        console.log("In the category " + clueCat);    
        console.log(clueQuestion);
        console.log("What is: " + clueAnswer);
        console.log("You've earned: " + clueVal);
        */

        let displayClue = document.getElementById('clue'),
            displayCat = document.getElementById('category'),
            displayValue = document.getElementById('value');
        
           $(displayClue).html(clueQuestion);
           $(displayCat).html(clueCat);
           $(displayValue).html(clueVal);

           let button = document.getElementById('theAnswerIs');


   
         $(button).on("click", function showAnswer() {
            const answer = document.createElement('span');
            answer.textContent = "What is " + clueAnswer + "?";
            $(displayClue).append(answer);
            $(button).remove();

            const nextQuestion = document.createElement('button');
            $(nextQuestion).attr("id", "nextQuestion");
            nextQuestion.textContent = "Next Question";

            $(displayClue).after(nextQuestion);


        $(nextQuestion).on("click", function reloadPage() {
            location.reload();
        });

        }); // end button on click

        

      } else {
        console.log('API is inaccessible')
      }

 

    } // end request.onload

    // Send request
    request.send()

}); // end document.ready