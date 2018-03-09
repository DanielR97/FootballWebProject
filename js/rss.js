window.onload = initialize;

function initialize(){
	initializeFirebase();
  var RSSCategories = document.getElementsByClassName("rss");
  for (var i = 0; i < RSSCategories.length; i++){
    RSSCategories[i].addEventListener("click", showRSSFile)
  }
}

function showRSSFile(){
  createRSS();
}

function createRSS(){

  var refvotes = firebase.database().ref().child("rssVotes");
  refvotes.once("value", showVotes);
}


function showVotes(snapshot) {
  var data = snapshot.val();
  var RSSDocument = '<?xml version="1.0" encoding="UTF-8"?>';
  RSSDocument += '<rss version="2.0">';
  RSSDocument += '<channel>';
  RSSDocument += '<title>The Best</title>';
  RSSDocument += '<link>index.html</link>';
  RSSDocument += '<description>See the voting results</description>';
  for (var key in data){
    RSSDocument += '<item>';
    RSSDocument += '<title>' + data[key].Vote + '</title>';
    RSSDocument += '<description>' + data[key].Voter + '</description>';
    RSSDocument += '<link>login.html</link>';
    RSSDocument += '</item>';
  }
  RSSDocument += '</channel>';
  RSSDocument += '</rss>';

  window.open('data:text/xml,' + encodeURIComponent(RSSDocument),
  "Test", "width=300,height=300,scrollbars=1,resizable=1");
}

function initializeFirebase() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCku4jwy2-AU_6HLwra7G00Di8MTieDYTs",
    authDomain: "footballwebproject.firebaseapp.com",
    databaseURL: "https://footballwebproject.firebaseio.com",
    projectId: "footballwebproject",
    storageBucket: "footballwebproject.appspot.com",
    messagingSenderId: "617917317896"
  };
  firebase.initializeApp(config);
}
