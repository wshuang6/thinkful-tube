//API TO WORK WITH
//set api url to a variable

const SEARCHURL = "https://www.googleapis.com/youtube/v3/search";
const TUBEURL = "https://www.youtube.com/watch?v=";
const CHANNELURL = "https://www.youtube.com/channel/";

var state = {
  pageIndex:1,
  userLastQuery:'',
  previousToken:'',
  nextToken:''
}

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
  state.previousToken = data.prevPageToken;
  state.nextToken = data.nextPageToken;
  let stringHTML = `This is results page ${state.pageIndex}`;
  if (data.items.length > 0){
    data.items.forEach(function(data2){
      stringHTML+=`<div class="video-container"><p>Title: ${data2.snippet.title}</p><a href="${CHANNELURL}${data2.snippet.channelId}"><p>Channel: ${data2.snippet.channelTitle}</p></a><a href="${TUBEURL}${data2.id.videoId}"><img src="${data2.snippet.thumbnails.high.url}" width="250px"/></a></div>`;
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
function getLastQuery(state){
  return state.userLastQuery;
}
$(".search-input-form").submit(function(event) {
	event.preventDefault();
	state.pageIndex = 1;
	var userQuery = $(".search-input").val();
  if (/\S/.test(userQuery)) {
    state.userLastQuery = userQuery;
    getData(userQuery, searchResultsRender);
    this.reset();
  } else {
    alert('Enter a Search');
  }

});

$(".prev-page").click(function(event) {
  if (state.pageIndex===1){
    return;
  } else {
    state.pageIndex--;
    getData(getLastQuery(state), searchResultsRender, state.previousToken);
  }

});
$(".next-page").click(function(event){
	state.pageIndex++;
	getData(getLastQuery(state), searchResultsRender, state.nextToken);
  console.log(state.nextToken);
});

//event listeners
