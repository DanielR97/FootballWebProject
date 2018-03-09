window.onload = loadEvents;
var table = [];


function loadEvents() {
  var form = document.getElementById("newTeam");
  document.getElementById("current-form").innerHTML = "Team";
  document.getElementById("won-form").style.display = "none";
  document.getElementById("draw-form").style.display = "none";
  document.getElementById("lost-form").style.display = "none";
  document.getElementById("gs-form").style.display = "none";
  document.getElementById("gc-form").style.display = "none";
  document.getElementById("manager-form").style.display = "none";
  document.getElementById("stadium-form").style.display = "none";
  form.addEventListener("submit", newTeam);
}

function showTable() {
  var tableBody = document.getElementById("teamsStandings");
  var fullTable = "";

  for (var i = 0; i < table.length; i++) {
    fullTable +=
    "<tr><td>" + table[i].name + "</td><td>" + table[i].points +
    "</td><td>" + table[i].played + "</td><td>" + table[i].won +
    "</td><td>" + table[i].draw + "</td><td>" + table[i].lost +
    "</td><td>" + table[i].scored + "</td><td>" + table[i].conceded +
    "</td><td>" + table[i].manager + "</td><td>" + table[i].stadium +
    "</td></tr>";
  }

  tableBody.innerHTML = fullTable;
}

function newTeam(event) {
  event.preventDefault();
  var form = document.getElementById("newTeam");
  var check = 0;
  if (form.team.value == "") {
    event.preventDefault();
    document.getElementById("errorTeam").style.display = "block";
  } else {
    check++;
    document.getElementById("team-form").style.display = "none";
    document.getElementById("won-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Games Won";
    document.getElementById("errorTeam").style.display = "none";
  } if (form.won.value == "") {
    event.preventDefault();
    document.getElementById("errorWin").style.display = "block";
  } else {
    check++;
    document.getElementById("won-form").style.display = "none";
    document.getElementById("draw-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Games Drawn";
    document.getElementById("errorWin").style.display = "none";
  } if (form.draw.value == "") {
    event.preventDefault();
    document.getElementById("errorDraw").style.display = "block";
  } else {
    check++;
    document.getElementById("draw-form").style.display = "none";
    document.getElementById("lost-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Games Lost";
    document.getElementById("errorDraw").style.display = "none";
  } if (form.lost.value == "") {
    event.preventDefault();
    document.getElementById("errorLost").style.display = "block";
  } else {
    check++;
    document.getElementById("lost-form").style.display = "none";
    document.getElementById("gs-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Goals Scored";
    document.getElementById("errorLost").style.display = "none";
  } if (form.goalsScored.value == "") {
    event.preventDefault();
    document.getElementById("errorGS").style.display = "block";
  } else {
    check++;
    document.getElementById("gs-form").style.display = "none";
    document.getElementById("gc-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Goals Conceded";
    document.getElementById("errorGS").style.display = "none";
  } if (form.goalsConceded.value == "") {
    event.preventDefault();
    document.getElementById("errorGC").style.display = "block";
  } else {
    check++;
    document.getElementById("gc-form").style.display = "none";
    document.getElementById("manager-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Manager";
    document.getElementById("errorGC").style.display = "none";
  } if (form.manager.value == "") {
    event.preventDefault();
    document.getElementById("errorManager").style.display = "block";
  } else {
    check++;
    document.getElementById("manager-form").style.display = "none";
    document.getElementById("stadium-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Stadium";
    document.getElementById("errorManager").style.display = "none";
    document.getElementById("login").innerHTML = '<img src="../img/addTeam.png" alt="AddTeam" width="50" height="50">';
  } if (form.stadium.value == "") {
    event.preventDefault();
    document.getElementById("errorStadium").style.display = "block";
  } else {
    check++;
    document.getElementById("stadium-form").style.display = "none";
    document.getElementById("team-form").style.display = "block";
    document.getElementById("current-form").innerHTML = "Team";
    document.getElementById("errorStadium").style.display = "none";
    document.getElementById("login").innerHTML = '<img src="../img/nextForm.png" alt="NextForm" width="50" height="50">';
  }

  var teamInsertedByUser = document.getElementById("team").value;
  var gamesWonInsertedByUser = document.getElementById("won").value;
  var gamesDrawnInsertedByUser = document.getElementById("draw").value;
  var gamesLostInsertedByUser = document.getElementById("lost").value;
  var goalsScoredInsertedByUser = document.getElementById("goalsScored").value;
  var goalsConcededInsertedByUser = document.getElementById("goalsConceded").value;
  var managerInsertedByUser = document.getElementById("manager").value;
  var stadiumInsertedByUser = document.getElementById("stadium").value;
  var pointsInsertedByUser = parseInt(gamesWonInsertedByUser) * 3 + parseInt(gamesDrawnInsertedByUser);
  var gamesPlayedInsertedByUser = parseInt(gamesWonInsertedByUser) + parseInt(gamesDrawnInsertedByUser) + parseInt(gamesLostInsertedByUser);

  var newTeam = {
    name: teamInsertedByUser, points: pointsInsertedByUser,
    played: gamesPlayedInsertedByUser, won: gamesWonInsertedByUser,
    draw: gamesDrawnInsertedByUser, lost: gamesLostInsertedByUser,
    scored: goalsScoredInsertedByUser, conceded: goalsConcededInsertedByUser,
    manager: managerInsertedByUser, stadium: stadiumInsertedByUser
  };
  if (check == 8) {
    table.push(newTeam);
    showTable();
    document.getElementById("newTeam").reset();
  }
}
