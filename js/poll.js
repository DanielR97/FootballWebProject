window.onload = initialize;
var refVotes;
var refVoteToEdit;
var storageRef;
var imagesRef;
var image;
const add = "Add";
const edit = "Edit";
var mode = add;
var url;
var pictureName;
var latchkey;

function initialize() {
  initializeFirebase();
  var form = document.getElementById("form");
  form.addEventListener("submit", sendData);
  refRss = firebase.database().ref().child("rssVotes");
  image = document.getElementById("image");
  image.addEventListener("change", uploadImage);
  storageRef = firebase.storage().ref();
  imagesRef = firebase.database().ref().child("Images");
  checkLogInStatus();
  showVotes();
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userID = firebase.auth().currentUser.uid;
      if (userID == '6fXa23yhcAeIuWzfIMMFFwN7aD12') {
        return false;
      } else {
        restrictAccess();
      }
    } else {
      restrictAccess();
    }
  });
}

function restrictAccess() {
  window.location='login.html';
}

function uploadImage(snapshot) {
  var imageToUpload = image.files[0];
  var uploadTask = storageRef.child('images/' + imageToUpload.name).put(imageToUpload);
  document.getElementById("progress").className = "";
  uploadTask.on('state_changed',
    function(snapshot){
      var progressBar = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.getElementById("progressBar").style.width = progressBar + "%";
    }, function(error) {
      document.getElementById('uploadPic').src = "img/cross.png";
    }, function() {
      document.getElementById('uploadPic').src = "img/tick.png"
      var downloadURL = uploadTask.snapshot.downloadURL;
      url = downloadURL;
      document.getElementById("progress").className = "hidden";
    });
}

function deleteVote(event) {
  latchkey = this.getAttribute("data-identifier");
  var refVotes = firebase.database().ref().child("Votes").child(latchkey);
  var refRss = firebase.database().ref().child("rssVotes").child(latchkey);
  refVotes.on("value", getImageName);
  refRss.on("value", deleteRss);
  var imageRef = storageRef.child("images/" + pictureName);
  imageRef.delete().then(function() {
  }).catch(function(error) {
  });
  refVotes.remove();
}

function deleteRss() {
  refRss.remove();
}


function getImageName(snapshot) {
  var data = snapshot.val();
  pictureName = data.imageName;
}

function editVote(event) {
  var latchkey = this.getAttribute("data-identifier");
  refVoteToEdit = firebase.database().ref().child("Votes").child(latchkey);
  refRssToEdit = firebase.database().ref().child("rssVotes").child(latchkey);
  refVoteToEdit.once("value", function(snapshot){
    var data = snapshot.val();
    var form = document.getElementById("form");
    form.voter.value = data.Voter;
    form.vote.value = data.Vote;
    form.rating.value = data.Rating;
    form.nationality.value = data.Nationality;
    form.position.value = data.Position;
    mode = edit;
  });
  refRssToEdit.once("value", function(snapshot){
    var data = snapshot.val();
    var form = document.getElementById("form");
    Vote: form.vote.value;
    Voter: form.voter.value;
    url: url;
    mode = edit;
  });
}

function sendData(event) {
  var form = event.target;
  var check = 0;
  if(form.image.value == "") {
    event.preventDefault();
    document.getElementById("errorPicture").style.display = "block";
  } else {
    check++;
    document.getElementById("errorPicture").style.display = "none";
  } if (form.voter.value == "") {
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
  if (check == 8) {
    var imageName = document.getElementById("image").value;
    imageName = imageName.replace(/^.*[\\\/]/, '');
    if (mode == add) {
      refVotes.push({
        imageName: imageName,
        Photo: url,
        Voter: form.voter.value,
        Vote: form.vote.value,
        Rating: form.rating.value,
        Nationality: form.nationality.value,
        Position: form.position.value
      })
      refRss.push({
        Vote: form.vote.value,
        Voter: form.voter.value,
        url: url
      });
    } else {
      refVoteToEdit.update({
        imageName: imageName,
        Photo: url,
        Voter: form.voter.value,
        Vote: form.vote.value,
        Rating: form.rating.value,
        Nationality: form.nationality.value,
        Position: form.position.value
      })
      refRssToEdit.update({
        Vote: form.vote.value,
        Voter: form.voter.value,
        url: url
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
    allVotes += '<tr><td> <img class="delete" src="img/trash.png" alt="Trash" data-identifier="' + key + '"/>'+
    '<img class="edit" src="img/pencil.png" alt="Pencil" data-identifier="' + key + '"/>' + "</td><td>" + '<img width="50" height="50" class="img-thumbnail" src="' + data[key].Photo +
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
