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
    */

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

}); // end document.ready