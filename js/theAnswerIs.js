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
            trimmedClueQuestion = clueQuestion.slice(1, -1);
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
            displayValue = document.getElementById('value'),
            displayAnswer = document.getElementById('answer'),
            trimmedAnswer = clueAnswer.replace(/\\|/g,'');

           $(displayClue).html(trimmedClueQuestion);
           $(displayClue).addClass('loaded')
           $(displayCat).html(clueCat);
           $(displayValue).html(clueVal);
           $(displayAnswer).html("What is " + trimmedAnswer + "?");

        const answerButton = document.createElement('button');
           $(answerButton).attr("id", "theAnswerIs");
             answerButton.textContent = 'The Answer Is...';
           $('footer').html(answerButton);


        let showAnswer = document.getElementById('theAnswerIs');

         $(showAnswer).on("click", function showAnswerFunction() { 
            $(displayClue).addClass('faded');
            setTimeout (function() {
                $(displayAnswer).addClass('loaded'); 
            }, 150);

            $(showAnswer).remove();

            const nextQuestion = document.createElement('button');
            $(nextQuestion).attr("id", "nextQuestion");
            // nextQuestion.textContent = "Next Question";
            // $(nextQuestion).html()
            nextQuestion.innerHTML = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380.59 128.64"><polygon points="318.18 1.91 311.11 8.98 361.44 59.32 0 59.32 0 69.32 361.44 69.32 311.11 119.66 318.18 126.73 380.59 64.32 318.18 1.91"/></svg>'
            $('footer').html(nextQuestion);


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