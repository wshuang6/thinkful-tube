//API TO WORK WITH
//set api url to a variable

let TUBEURL = "https://www.googleapis.com/youtube/v3/search";

//set query into an object to getData

function getData(searchTerm, callback){
    let searchQueryTerms = {
      k: 'AIzaSyCBjVpv9ddoP2MQK5ZVqqwwcznR4lQB_GU',
      q: searchTerm,
      part: "snippet",
      maxResults: 10
    };
    $.getJSON(TUBEURL, query, callback);
}

//function to display the data retrieved.
// this function should output html with the data retrieved.



//event listeners
