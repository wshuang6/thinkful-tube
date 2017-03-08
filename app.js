//API TO WORK WITH
//set api url to a variable

const SEARCHURL = "https://www.googleapis.com/youtube/v3/search";
const TUBEURL = "https://www.youtube.com/watch?v=";
const CHANNELURL = "https://www.youtube.com/channel/";

var pageIndex=1;
var userLastQuery = [];
//set query into an object to getData

function getData(searchTerm, callback, prevNext){
    let searchQueryTerms = {
      key: 'AIzaSyCBjVpv9ddoP2MQK5ZVqqwwcznR4lQB_GU',
      q: searchTerm,
      part: "snippet",
      maxResults: 10,
      pageToken: prevNext
    };
    $.getJSON(SEARCHURL, searchQueryTerms, callback);
}

function searchResultsRender (data) {
  let stringHTML = `This is results page ${pageIndex}`;
  if (data.items.length > 0){
    data.items.forEach(function(data2){
      stringHTML+=`<p>Title: ${data2.snippet.title}</p><a href="${CHANNELURL}${data2.snippet.channelId}"><p>Channel: ${data2.snippet.channelTitle}</p></a><a href="${TUBEURL}${data2.id.videoId}"><img src="${data2.snippet.thumbnails.high.url}" /></a><br/>`;
    });
  }
  else {
  	stringHTML+='No results found';
  }
  $('.search-results').html(stringHTML);
}

//button prev: data.prevPageToken
//button next: data.nextPageToken

//getData("logan", searchResultsRender);
//function to display the data retrieved.
// this function should output html with the data retrieved.

$(".search-input-form").submit(function(event) {
	event.preventDefault();
	pageIndex = 1;
	var userQuery = $(".search-input").val();
	userLastQuery.pop();
	userLastQuery.push(userQuery);
	getData(userQuery, searchResultsRender);
	this.reset();
});

$(".prev-page").click(function(event) {
	pageIndex--;
	getData(userLastQuery[0], searchResultsRender);
});
$(".next-page").click(function(event){
	pageIndex++;
	getData(userLastQuery[0], searchResultsRender);
});

//event listeners
