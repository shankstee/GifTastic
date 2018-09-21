var staticButtonsList =["Kanye", "Chance The Rapper", "Kendrick Lamar", "Ice Cube", "Drake", "Will Smith", "Mac Miller"];// This is may array of static buttons that load when the page loads 
var APIkey = "rIvAU8zGUYxGIgQrkMHBzKFPTh0rEJlS"; // my api key

var rapper; // var to hold current rapper
$(document).ready(function () { // load my JS after HTML page loads 
    console.log("Linked"); // self check that JS is linked correctly

    
    staticButtonsList.forEach(function(title) { // for each thing in my staticList  grab it and it is now called title within the loop
    var buttons = $("<button>"); // Create a button for each item in my array
    buttons.text(title); // add the title from my static list to the new button
    buttons.attr("data-name", title); // add a data-nam attr with the title from my static array
    buttons.addClass("clickedButton");// add class for button
    $(".buttonsDiv").append(buttons);// add new button to my buttons div on html page
});
$(document).on("click", ".clickedButton", function() {
    $(".gifs").empty();
    console.log("WORKEDDDDD");
     
    rapper = $(this).attr("data-name"); // rapper is now = the clicked button date-name


var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+APIkey+"&q="+rapper+"&limit=15&offset=0&rating=r&lang=en"; // var to hold my full ajax link

$.ajax({
    url: queryURL,// my ajax call
    method: "GET"
  })
  
    
    .then(function(response) { // After the data from the AJAX request comes back
        var result = response.data; // var to shorten things throughout my code

        for (let i = 0; i < result.length; i++) { // for loop to grab 10 different gifs from JSON obj
        var stillURL = result[i].images.downsized_still.url; // save the still url to pause gif
        var movingURL = result[i].images.downsized_medium.url; // save the moving gif
        var rating = result[i].rating; // grab each rating for each gif
        var imgTag = $("<img>"); // create a img tag for the gif
        imgTag.addClass("gifClick"); // add class the grab img tag
        // every time a img tag is created give it a attr of data-state = to the still image and another = to the animated image
        imgTag.attr("data-still", stillURL); // add data still url as attr to each img tag
        imgTag.attr("data-move", movingURL); // add data moving as attr to each img tag
        imgTag.attr("data-state", "still"); // add and set data-state to still when the page loads to match the still img
        imgTag.attr("src", stillURL); // add still source to src of img tag to start the page
        var p = $("<p>").text("Rating: " + rating); // add p tag for rating
        imgTag.prepend(p);// add p tag with ratting to the top of each gif
        var imgDiv = $("<div class='divSize'>"); // div to hold my img tag
        imgDiv.append(imgTag);// add img tag to new div tag
        imgDiv.prepend(p); // add the p tag above div holding img tag
        $(".gifs").append(imgDiv);// append img div with imgtag within it to the page

        
        }
        $(".gifClick").on("click", function() { // on click of newly created gifs
            var state = $(this).attr("data-state"); // sav the current state of the img as a var 
            if (state == "still") {
                $(this).attr("src", $(this).attr("data-move")); // the img clicked should now change from still to moving by changing the data-move attr as the src of the img tag now
                $(this).attr("data-state", "animated"); // change the data state attr to animated 
            }
            else { // if the img state is not = to still meaning it should be equal to animated
                $(this).attr("src", $(this).attr("data-still")); // change the gif clicked attr to the data still link
                $(this).attr("data-state", "still"); // change data state back to still
            }
  
        });

    });
 
})


$(".addButton").on("click", function (event) { 
    console.log("working");
    event.preventDefault();
    var userInput = $(".userInput").val().trim();
    var creaButtons = $("<button class='clickedButton'>");
    creaButtons.text(userInput);
    creaButtons.attr("data-name", userInput);
    $(".buttonsDiv").append(creaButtons);
})  


// $(document).on("click", ".newButton", function () {
//     rapper = $(this).attr("data-name");


    
     


        
        


     
});