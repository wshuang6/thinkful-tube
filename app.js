//API TO WORK WITH
//set api url to a variable

let TUBEURL = "https://www.googleapis.com/youtube/v3/search";

//set query into an object to getData

function getData(searchTerm, callback){
    let searchQueryTerms = {
      key: 'AIzaSyCBjVpv9ddoP2MQK5ZVqqwwcznR4lQB_GU',
      q: searchTerm,
      part: "snippet",
      maxResults: 10
    };
    $.getJSON(TUBEURL, searchQueryTerms, callback);
}

function searchResultsRender (data) {
	data.items.forEach(function(data2){
		console.log(data2.snippet.thumbnails.high.url);
	});
	//data.Search.forEach(function(item) {console.log(item)});;
}

getData("logan", searchResultsRender);
//function to display the data retrieved.
// this function should output html with the data retrieved.



//event listeners
