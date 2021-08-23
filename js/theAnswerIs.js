$(document).ready(function () {


    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    // request.open('GET', 'https://jservice.io/api/clues', true) old API with 100 clues
    request.open('GET', 'https://theansweris.app/database/clues.json', true)
    request.onload = function () {
    // Begin accessing JSON data here
    var clues = JSON.parse(this.response)
        /*
    let categorySelection = $('#catSelect').find(":selected").val();
        categorizedData = $.grep(clues, function(cat) {
            return cat.category === categorySelection; // this needs to run a "contains" on the string of the categorySelection value i.e. if the value is "Shakes" return anything that also says "Shakespeare" - currently returns exact matches only
        }); // end categorized data grep
        */



    function getClue() {
    /*    categorySelection = $('#catSelect').find(":selected").val();
        var categorizedData = $.grep(clues, function(cat) {
            return cat.category === categorySelection; // this needs to run a "contains" on the string of the categorySelection value i.e. if the value is "Shakes" return anything that also says "Shakespeare" - currently returns exact matches only      
        }) // end categorized data grep */
        /*
        $('#catSelect').on("change", function() {
            var categorySelection = $('#catSelect').find(":selected").val();
            console.log('The new category will be: ' + categorySelection)
            var categorizedData = $.grep(clues, function(cat) {
                return cat.category === categorySelection; // this needs to run a "contains" on the string of the categorySelection value i.e. if the value is "Shakes" return anything that also says "Shakespeare" - currently returns exact matches only      
            }) // end categorized data grep

        }); // end catselect onChange
        */
        var randomClue = Math.floor(Math.random() * clues.length);

        var loader = document.getElementById('loader');   
        console.log("Clue number: " + randomClue);
        // console.log("categorySelection: " + categorySelection);

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


            $(loader).fadeOut("fast", function(){ });

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
          $('.container').fadeOut( "fast", function(){});
          setTimeout(function() {
                  $('.container__wrap').load('index.html .container', function() {
                    /* if (categorySelection == 'all') {
                        getClue();
                    } else {
                        // console.log("This category is unrecognized")
                        getClue();
                    } */
                    getClue()
                  });
          }, 150);

      }); // end nextQuestion onclick

  }); // end button on click

  
    } // end function getClue();

    if (request.status >= 200 && request.status < 400) {
            getClue();
      } else {
        console.log('API is inaccessible')
      }

 

    } // end request.onload

    // Send request
    request.send()

}); // end document.ready