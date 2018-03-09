window.onload = initializeGame;
var playerDeck = [];
var playerScore = 0;
var dealerDeck = [];
var dealerScore = 0;
const start = "Start";
const ongoing = "Ongoing";
var mode = start;
var userChoice;
var AIChoice;

function initializeGame() {
  document.getElementById("blackjack").style.display = "block";
  document.getElementById("rps").style.display = "block";
  document.getElementById("title-blackjack").innerHTML = "Play the famous Blackjack!";
  document.getElementById("start-blackjack").style.display = "block";
  document.getElementById("rules-blackjack").style.display = "block";
  document.getElementById("restart-blackjack").style.display = "none";
  document.getElementById("exit-blackjack").style.display = "none";
  document.getElementById("hit").style.display = "none";
  document.getElementById("stand").style.display = "none";
  document.getElementById("result-blackjack").style.display = "none";
  document.getElementById("player-hand").innerHTML = '<img class="card" src="img/blackJoker.png" alt="BlackJoker">';
  document.getElementById("dealer-hand").innerHTML = '<img class="card" src="img/redJoker.png" alt="RedJoker">';
  document.getElementById("title-rps").innerHTML = "Maybe you prefer playing Rock, Paper, Scissors!";
  document.getElementById("start-rps").style.display = "block";
  document.getElementById("rules-rps").style.display = "block";
  document.getElementById("restart-rps").style.display = "none";
  document.getElementById("exit-rps").style.display = "none";
  document.getElementById("result-rps").style.display = "none";
  document.getElementById("player-choice").innerHTML = '<img class="rpsIcon" src="img/rpsIcon.png" alt="rpsIcon">';
  document.getElementById("ai-choice").innerHTML = '<img class="rpsIcon" src="img/rpsIcon.png" alt="rpsIcon">';
  document.getElementById("start-blackjack").addEventListener("click", startBlackjack);
  document.getElementById("start-rps").addEventListener("click", startRPS);
}

function startBlackjack() {
  dealerDeck = [];
  document.getElementById("rps").style.display = "none";
  document.getElementById("title-blackjack").innerHTML = "BlackJack";
  document.getElementById("start-blackjack").style.display = "none";
  document.getElementById("rules-blackjack").style.display = "none";
  document.getElementById("hit").style.display = "block";
  document.getElementById("stand").style.display = "block";
  document.getElementById("result-blackjack").style.display = "none";
  document.getElementById("player-hand").style.display = "block";
  document.getElementById("dealer-hand").style.display = "block";
  document.getElementById("restart-blackjack").style.display = "none";
  document.getElementById("exit-blackjack").style.display = "none";
  dealerDeck.push(getRandomInt(8, 10), getRandomInt(6, 10));
  dealerScore = dealerDeck[0] + dealerDeck[1];
  document.getElementById("dealer-hand").innerHTML = '<img class="card" src="img/deck/' + dealerDeck[0]
  + '.png" alt="' + dealerDeck[0] + '"><img class="card" src="img/deck/0.png" alt="0">';
  drawCard();
  document.getElementById("stand").addEventListener("click", showResultBlackJack);
  document.getElementById("hit").addEventListener("click", drawCard);
}

function drawCard() {
  if (mode == start) {
    playerDeck = [];
    playerDeck.push(getRandomInt(2, 11), getRandomInt(2, 10));
    playerScore = playerDeck[0] + playerDeck[1];
    mode = ongoing;
  } else {
    playerDeck.push(getRandomInt(2, 10));
    playerScore = 0;
    for (var i = 0; i < playerDeck.length; i++) {
      playerScore += playerDeck[i];
    }
  }
  var aux = '';
  for (var i = 0; i < playerDeck.length; i++) {
    aux += '<img class="card" src="img/deck/' + playerDeck[i] + '.png" alt="' + playerDeck[i] + '">';
  }
  document.getElementById("player-hand").innerHTML = aux;
  if (playerScore >= 21) {
    showResultBlackJack();
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function showResultBlackJack() {
  document.getElementById("restart-blackjack").style.display = "block";
  document.getElementById("exit-blackjack").style.display = "block";
  document.getElementById("dealer-hand").innerHTML = '<img class="card" src="img/deck/' + dealerDeck[0] + '.png" alt="'
  + dealerDeck[0] + '">' + '<img class="card" src="img/deck/' + dealerDeck[1] + '.png" alt="' + dealerDeck[1] + '">';
  document.getElementById("hit").style.display = "none";
  document.getElementById("stand").style.display = "none";
  if (playerScore < dealerScore || playerScore > 21) {
    document.getElementById("result-blackjack").innerHTML = "<h2>Oh! You've sadly lost this time but you can try again!</h2>";
  } else if (playerScore > dealerScore) {
    document.getElementById("result-blackjack").innerHTML = "<h2>Congratulations! You've won!</h2>";
  } else {
    document.getElementById("result-blackjack").innerHTML = "<h2>Ups! It was a tie!</h2>";
  }
  document.getElementById("result-blackjack").style.display = "block";
  mode = start;
  document.getElementById("restart-blackjack").addEventListener("click", startBlackjack);
  document.getElementById("exit-blackjack").addEventListener("click", initializeGame);
}


function startRPS() {
  AIChoice = Math.random();
  if (AIChoice < 0.34) {
      AIChoice = "rock";
  } else if(AIChoice <= 0.67) {
      AIChoice = "paper";
  } else {
      AIChoice = "scissors";
  }
  document.getElementById("blackjack").style.display = "none";
  document.getElementById("rps").style.display = "block";
  document.getElementById("title-rps").innerHTML = "Rock, Paper, Scissors!";
  document.getElementById("start-rps").style.display = "none";
  document.getElementById("rules-rps").style.display = "none";
  document.getElementById("result-rps").style.display = "none";
  document.getElementById("restart-rps").style.display = "none";
  document.getElementById("exit-rps").style.display = "none";
  document.getElementById("player-choice").innerHTML
  = '<img class="buttonGame" src="img/rock.png" alt="Rock" id="rock">'
  + '<img class="buttonGame" src="img/paper.png" alt="Paper" id="paper">'
  + '<img class="buttonGame" src="img/scissors.png" alt="Scissors" id="scissors">';
  document.getElementById("ai-choice").innerHTML
  = '<h4 class="white rules">Waiting for you to make a move...</h4>'
  + '<img class="centerImg" src="img/loading.gif" alt="Loading" width="100" height="100" id="loading">';
  document.getElementById("rock").addEventListener("click", playRock);
  document.getElementById("paper").addEventListener("click", playPaper);
  document.getElementById("scissors").addEventListener("click", playScissors);
}

function playRock() {
  if (AIChoice == "rock") {
    document.getElementById("result-rps").innerHTML = "<h2>Ups! It was a tie!</h2>";
  } else if (AIChoice == "paper") {
    document.getElementById("result-rps").innerHTML = "<h2>Oh! You've sadly lost this time but you can try again!</h2>";
  } else {
    document.getElementById("result-rps").innerHTML = "<h2>Congratulations! You've won!</h2>";
  }
  document.getElementById("player-choice").innerHTML = '<img class="resultRPS" src="img/rock.png" alt="Rock">';
  showResultRPS();
}

function playPaper() {
  if (AIChoice == "rock") {
    document.getElementById("result-rps").innerHTML = "<h2>Congratulations! You've won!</h2>";
  } else if (AIChoice == "paper") {
    document.getElementById("result-rps").innerHTML = "<h2>Ups! It was a tie!</h2>";
  } else {
    document.getElementById("result-rps").innerHTML = "<h2>Oh! You've sadly lost this time but you can try again!</h2>";
  }
  document.getElementById("player-choice").innerHTML = '<img class="resultRPS" src="img/paper.png" alt="Paper">';
  showResultRPS();
}

function playScissors() {
  if (AIChoice == "rock") {
    document.getElementById("result-rps").innerHTML = "<h2>Oh! You've sadly lost this time but you can try again!</h2>";
  } else if (AIChoice == "paper") {
    document.getElementById("result-rps").innerHTML = "<h2>Congratulations! You've won!</h2>";
  } else {
    document.getElementById("result-rps").innerHTML = "<h2>Ups! It was a tie!</h2>";
  }
  document.getElementById("player-choice").innerHTML = '<img class="resultRPS" src="img/scissors.png" alt="Scissors">';
  showResultRPS();
}

function showResultRPS() {

  document.getElementById("ai-choice").innerHTML = '<img class="resultRPS" src="img/' + AIChoice + '.png" alt="' + AIChoice + '">';
  document.getElementById("result-rps").style.display = "block";
  document.getElementById("restart-rps").style.display = "block";
  document.getElementById("exit-rps").style.display = "block";
  document.getElementById("restart-rps").addEventListener("click", startRPS);
  document.getElementById("exit-rps").addEventListener("click", initializeGame);
}
