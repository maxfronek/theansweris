$(document).ready(function () {

    /*
        $.each(data, function(entryIndex, entry) {

        let clue = entry['question'];

        var html = '<div class="entry">';
        html += '<h3 class="title">' + entry['title'] + '</h3>';
        html += '<div class="link_url">' + entry['link_url'] + '</div>';
        html += '<div class="image_src">';
        html += entry['image_src'];
        if (entry['quote']) {
            html += '<div class="quote">';
            $.each(entry['quote'], function(lineIndex, line) {
            html += '<div class="quote-line">' + line + '</div>';
            });
            if (entry['author']) {
            html += '<div class="quote-author">' + entry['author'] + '</div>';
            }
            html += '</div>';
        }
        html += '</div>';
        html += '</div>';

        $('#dictionary').append(html).fadeIn(); 


    function getClue() {

        $.getJSON('./assets/clues.json', function(data) { 

            let randomClue = data[Math.floor(Math.random()*data.length)],
                clueQuestion = randomClue['question'],
                clueAnswer = randomClue['answer'],
                clueCategory = randomClue['category'],
                clueValue = randomClue['value'];

                console.log('The question is: ' + clueQuestion);
                console.log('The answer is: ' + clueAnswer);

      
        }); // end getJSON
    } // end getClue

    getClue();
    */

    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://jservice.io/api/clues', true)

    request.onload = function () {
    // Begin accessing JSON data here
    var clues = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        const randomClue = Math.floor(Math.random() * clues.length);    
        console.log("Clue number: " + randomClue);

        let clueQuestion = clues[randomClue].question,
            clueAnswer = clues[randomClue].answer,
            clueCat = clues[randomClue].category.title,
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
           $(displayValue).html("$" + clueVal);

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