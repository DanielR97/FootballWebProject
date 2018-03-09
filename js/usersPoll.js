window.onload = initialize;
var refVotes;
var refVoteToEdit;
const add = "Add";
const edit = "Edit";
var mode = add;

function initialize() {
  initializeFirebase();
  var form = document.getElementById("form");
  form.addEventListener("submit", sendData);
  checkLogInStatus();
  showVotes();
  form.style.display = "none";
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userID = firebase.auth().currentUser.uid;
      if (userID == '6fXa23yhcAeIuWzfIMMFFwN7aD12') {
      } else {
      }
    } else {
      restrictAccess();
    }
  });
}

function restrictAccess() {
  window.location='login.html';
}

function deleteVote(event) {
  var latchkey = this.getAttribute("data-identifier");
  var refVotes = firebase.database().ref().child("Votes").child(latchkey);
  refVotes.remove();
}

function editVote(event) {
  var latchkey = this.getAttribute("data-identifier");
  refVoteToEdit = firebase.database().ref().child("Votes").child(latchkey);
  refVoteToEdit.once("value", function(snapshot){
    var data = snapshot.val();
    var form = document.getElementById("form");
    form.photo.value = data.Photo;
    form.voter.value = data.Voter;
    form.vote.value = data.Vote;
    form.rating.value = data.Rating;
    form.nationality.value = data.Nationality;
    form.position.value = data.Position;
    mode = edit;
    document.getElementById("send-button").innerHTML = "Edit";
  });
}

function sendData(event) {
  var form = event.target;
  var check = 0;
  if (form.voter.value == "") {
    event.preventDefault();
    document.getElementById("errorVoter").style.display = "block";
  } else {
    check++;
    document.getElementById("errorVoter").style.display = "none";
  } if (form.vote.value == "") {
    event.preventDefault();
    document.getElementById("errorVote").style.display = "block";
  } else {
    check++;
    document.getElementById("errorVote").style.display = "none";
  } if (form.rating.value == "") {
    event.preventDefault();
    document.getElementById("errorRating").style.display = "block";
  } else {
    check++;
    document.getElementById("errorRating").style.display = "none";
  } if (form.rating.value != "" && form.rating.value < 1 || form.rating.value > 10) {
    event.preventDefault();
    document.getElementById("errorRatingNumber").style.display = "block";
  } else {
    check++;
    document.getElementById("errorRatingNumber").style.display = "none";
  } if (form.nationality.value == "") {
    event.preventDefault();
    document.getElementById("errorNationality").style.display = "block";
  } else {
    check++;
    document.getElementById("errorNationality").style.display = "none";
  } if (form.managerradio.checked == false && form.captainradio.checked == false) {
    event.preventDefault();
    document.getElementById("errorPosition").style.display = "block";
  } else {
    check++;
    document.getElementById("errorPosition").style.display = "none";
  } if (form.displayRender.checked == false) {
    event.preventDefault();
    document.getElementById("errorDisplayVote").style.display = "block";
  } else {
    check++;
    document.getElementById("errorDisplayVote").style.display = "none";
  }
  if (check == 7) {
    if (mode == add) {
      refVotes.push({
        Photo: form.photo.value,
        Voter: form.voter.value,
        Vote: form.vote.value,
        Rating: form.rating.value,
        Nationality: form.nationality.value,
        Position: form.position.value
      });
    } else {
      refVoteToEdit.update({
        Photo: form.photo.value,
        Voter: form.voter.value,
        Vote: form.vote.value,
        Rating: form.rating.value,
        Nationality: form.nationality.value,
        Position: form.position.value
      });
      mode = add;
    }
  }
}

function showVotes() {
  refVotes = firebase.database().ref().child("Votes");
  refVotes.on("value", showData);
}

function showData(snapshot) {
  var data = snapshot.val();
  var tableBody = document.getElementById("votesTable");
  var allVotes = "";
  for (var key in data){
    allVotes += '<tr><td><img width="50" height="50" class="img-thumbnail" src="' + data[key].Photo +
    '"/>' + "</td><td>" + data[key].Voter + "</td><td>" + data[key].Vote + "</td><td>" + data[key].Rating +
    "</td><td>" + data[key].Nationality + "</td><td>" + data[key].Position + "</td></tr>";
  }
  document.getElementById("votesTable").innerHTML = allVotes;
  var images = document.getElementsByClassName("delete");
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", deleteVote);
  }

  var images = document.getElementsByClassName("edit");
  for(var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", editVote);
  }
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
