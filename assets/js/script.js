var wordSpacesInput = document.querySelector('#word');
var remainingSpan = document.querySelector("#remaining");
var gameMessage = document.querySelector('#message');
var startButton = document.querySelector('#startGame');
var resetButton = document.querySelector('#reset');
var winsTable = document.querySelector('#wins');
var lossesTable = document.querySelector('#losses');
var wordChoice = ["variable","function","array","object","loop","conditional",
"statement","algorithm","debugging","compiler","interpreter","recursion",
"string","integer","boolean","class","method","inheritance","polymorphism",
"abstraction","encapsulation","interface","constructor","destructor","module",
"library","framework","asynchronous","callback","promise","exception",
"syntax","operator","parameter","argument","namespace"];
var seconds = 9;
var guesses = "";
var chosenWord = "";
var counterDown;
var wins;
var losses;

function writeWinsLosses() {
    wins = localStorage.getItem('wins');
    losses = localStorage.getItem('losses');
    if(!wins ) {
        wins = 0;
    }
    if(!losses) {
        losses = 0;
    }
    winsTable.textContent = wins;
    lossesTable.textContent = losses;
}

function startGame() {
    chosenWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
    guesses = "";
    seconds = 9;
    remainingSpan.textContent = 10;
    gameMessage.textContent = "";
    countDown();
    displayLetters();
    document.addEventListener('keydown', keyDownGetGuess ); 
}

function keyDownGetGuess(event) {
        getGuess(event.key);
}

function countDown() {
    counterDown = setInterval(function() {
        if(seconds > 0) {
            remainingSpan.textContent = seconds;
            seconds--;
        } else if (seconds == 0) {
            remainingSpan.textContent = seconds;
            seconds--;
        } else {
            endGameLose();
        }
    }, 1000)
}

function displayLetters() { 
    wordSpacesInput.textContent = "";   
    for(var i=0;i < chosenWord.length;i++ ) {
        guesses += "_";
    }
    wordSpacesInput.textContent = guesses;   
}

function getGuess(letter) {    
      
    if( chosenWord.indexOf(letter) !== -1) {
        var wordIndex = chosenWord.indexOf(letter);
        var str = [];
        while (wordIndex !== -1) {
            str = guesses.split('');
            str.splice(wordIndex, 1, letter);
            guesses = str.join('');
            wordIndex = chosenWord.indexOf(letter, wordIndex+1);
            wordSpacesInput.textContent = guesses;
            
        }
    } else {
        return;
    }
    if(guesses.indexOf('_') === -1) {
        endGameWin();
    }
}

function endGameWin() {    
    clearInterval(counterDown);
    gameMessage.textContent = "You Win, Good Job";
    stopKeyUpListener();
    wins = parseInt(wins);
    wins++;
    localStorage.setItem("wins",wins);
    writeWinsLosses();
}

function endGameLose() {
    clearInterval(counterDown);
    gameMessage.textContent = "You Lose, Sorry";
    wordSpacesInput.textContent = chosenWord;
    stopKeyUpListener();
    losses = parseInt(losses);
    losses++
    localStorage.setItem("losses",losses);
    writeWinsLosses();
}

function stopKeyUpListener() {    
    document.removeEventListener('keydown', keyDownGetGuess);
}

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    startGame();
});

resetButton.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.setItem('wins', "0");
    localStorage.setItem('losses', "0");
    writeWinsLosses();
});

writeWinsLosses();



