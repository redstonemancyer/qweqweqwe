$(document).ready(function(){
    console.log('Ready');

    // Fetch the current date and update it in the DOM
    let currentDate = new Date().toLocaleDateString();
    $('#currentDate').text(currentDate);

    // Event handler for Submit button click
    $('#submitButton').click(function(){
        // Get the text value from the textarea using the 'val()' method
        let textValue = $('#textInput').val();

        // Convert it to a JS object
        // Provide a 'key' here and write the same in app.py file as well to extract data
        let inputData = {'text': textValue};
        console.log(inputData);

        // Ajax request
        $.ajax({
            type: 'POST', 
            url: 'sentiment_analysis.py', 
            data: JSON.stringify(inputData), 
            dataType: 'json', 
            contentType: 'application/json', 
            success: function(response){
                let prediction = response.prediction;
                let emoticonUrl = response.emoticonUrl;

                // Update the DOM elements
                $('#prediction').text(prediction);
                $('#emoticon').attr('src', emoticonUrl);

                // Show them
                $('#resultContainer').show();
            },
            error: function(error){
                console.log(error);
            }
        });

        // Clear the textarea after every button push
        $('#textInput').val('');
    });
});
