window.onload = initialize;

function initialize() {
  initializeFirebase();
  var formLogin = document.getElementById("form-login");
  formLogin.addEventListener("submit", doLogin);
  var logOutButton = document.getElementById("logout");
  logOutButton.addEventListener("click", logOut);
  document.getElementById("btn-admin").addEventListener("click", adminPoll);
  document.getElementById("btn-user").addEventListener("click", normalPoll);

  checkLogInStatus();
}

function adminPoll() {
  window.location='adminPoll.html';
}

function normalPoll() {
  window.location='normalUserPoll.html';
}

function checkLogInStatus() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userID = firebase.auth().currentUser.uid;
      if (userID == '6fXa23yhcAeIuWzfIMMFFwN7aD12') {
        document.getElementById("btn-admin").style.display = "block";
        document.getElementById("btn-user").style.display = "block";
        document.getElementById("clue").style.display = "none";
      } else {
        document.getElementById("btn-user").style.display = "block";
        document.getElementById("btn-admin").style.display = "none";
        document.getElementById("clue").style.display = "none";
      }
      document.getElementById("logout").style.display = "block";
      document.getElementById("form-login").style.display = "none";
      document.getElementById("clue").style.display = "none";

    } else {
      document.getElementById("form-login").style.display = "block";
      document.getElementById("logout").style.display = "none";
      document.getElementById("btn-user").style.display = "none";
      document.getElementById("btn-admin").style.display = "none";
      document.getElementById("clue").style.display = "block";

      document.getElementById("form-login").reset();
    }
  });
}

function doLogin(event) {
  event.preventDefault();
  var formLogin = event.target;
  var email = formLogin.email.value;
  var password = formLogin.password.value;
  firebase.auth().signInWithEmailAndPassword(email, password).
  catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function logOut() {
  firebase.auth().signOut().then(function() {
}).catch(function(error) {
});
}

function initializeFirebase() {
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
