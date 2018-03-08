/* Pseudocode for giphy 
-create array of strings of topics that interest me
    these will be the topics of the giphies
-determine the url that will need to be json into
-create a variable to change parts of the url to search each topic (loop)
-create a button for each topic (same loop) that will bring up the giphies when clicked
    -make button clear the screen before adding the next set of images
-ajax the url
-check the object created to determine the various properties that will be needed:
    10 images
    static, animated when clicked, static when clicked again
        see if I can make it do this with mouseover instead
    display rating
-create $ that will append the image and ratings to the screen
-create a form submission to add button and giphies
*/

var topics = ["hockey", "warcraft", "star wars", "ghostbusters", "dogs", "beer"];

$(document).ready(function () {

    //create buttons from the topics array
    for (i = 0; i < topics.length; i++) {
        var but = $("<button>")
        but.attr("data-name", topics[i]);
        but.text(topics[i]);
        but.attr("class", "getGiphies");
        but.appendTo("#button-field");
    }
    //clicking buttons will first clear all the images on the screen and then create the gifs
    $(".getGiphies").click(function () {
        var topic = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=8dYLVJpkKo8KZ82vGwoBwBaZe4AOMJGB&limit=10";
        //console.log(queryURL);
        $("#giphyField").empty();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
                console.log(response);
                var results = response.data;
                for (i = 0; i < results.length; i++) {
                    //create 10 gifs with the url for stationary picture, url for gif, set the img source to stationary, set state to still, and give them all a common class for easy reference in other functions
                    var gifs = $("<img>");
                    gifs.attr("data-still", results[i].images.fixed_height_still.url);
                    gifs.attr("data-moving", results[i].images.fixed_height.url);
                    gifs.attr("src", results[i].images.fixed_height_still.url);
                    gifs.attr("data-state", "still");
                    gifs.attr("class", "pics");
                    var rating = $("<p>").text("Rated: " + results[i].rating);
                    $("#giphyField").prepend(rating);
                    $("#giphyField").prepend(gifs);
                    //console.log(results[i].images.fixed_height.url);
                }
        

            $(".pics").click(function () {
                var state = $(this).attr("data-state");
                console.log("click");
                if (state == "still") {
                    $(this).attr("src", $(this).attr("data-moving"));
                    $(this).attr("data-state", "moving");
                    console.log($(this).attr("data-state"));
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                    console.log($(this).attr("data-state"));
                }
            });
        });
    });

});