var wordsList = ["VEGETABLES", "MONASH", "PEOPLE", "GLOBAL", "SURRENDER"]

var word = [];
var guessedWord = [];

var flag = false;
var iamWinner = false;
var gameStarted = false;

var winner = 0;
var remainingGuesses = 12;
var alreadyGuessedLetters = [];


function whenKeypressed() {

    document.getElementById("started").innerHTML = ": Game Started! ";
    document.getElementById("started").style.color = "red";

    document.getElementById("userwins").innerHTML = winner;
    document.getElementById("userwins").style.color = "blue";


    document.getElementById("currentWord").style.color = "blue";

    document.getElementById("guesses").innerHTML = remainingGuesses;
    document.getElementById("guesses").style.color = "blue";

    document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters;
    document.getElementById("alreadyguessed").style.color = "blue";


}

function playAudio(rsc) {
    var audio = new Audio(rsc);
    audio.play();
}

document.onkeyup = function (event) {
    if (event.keyCode == 27) {
        window.location.reload(); 
    }
}

document.onkeypress = function (event) {

    playAudio('assets/javascript/click.mp3');

    var c = (event.key).toUpperCase();

    if (!flag) {
        whenKeypressed();
        generateRandomWords();
        flag = true;
    }

    if (gameStarted === false) {
        gameStarted = true
        return
    }

    for (let index = 0; index <= alreadyGuessedLetters.length; index++) {

        if (!alreadyGuessedLetters.includes(c) && checkInputChar(event) && word !== guessedWord) {
            alreadyGuessedLetters.push(c)
            document.getElementById("guesses").innerHTML = --remainingGuesses;
            document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters
            checkForCurrentWord(c);

        }
    }

    if (remainingGuesses <= 0) {

        setTimeout(myAlert(), 90000)
        function myAlert() {
            alert("You lost")
        }
        winner = 0
        flag = false;

        clearFunction()

        return
    }
}

// checks if the current character is maching
function checkForCurrentWord(c) {
    for (let index = 0; index < word.length; index++) {

        if (c == word[index]) {
            guessedWord[index] = c;
            document.getElementById("currentWord").innerHTML = guessedWord;

            if (!guessedWord.includes("-")) {
                if (iamWinner == false) {
                     guessedWord.forEach(guessFunction) ;
                    $('#exampleModalCenter').modal('show');
                    //toggleHidden()
                    clearFunction()
                    iamWinner = true;
                    flag = false;
                }
                document.getElementById("userwins").innerHTML = ++winner;
                return;
            }
        }
    }
}

function guessFunction(item, index) {
    document.getElementById("picFooter").innerHTML+=item;
}

function generateRandomWords() {
    var temp = wordsList[Math.floor(Math.random() * wordsList.length)];
    word = temp.split('');

    for (let index = 0; index < word.length; index++) {
        guessedWord.push("-")
    }
    document.getElementById("currentWord").innerHTML += guessedWord;

    iamWinner = false;
}

function checkInputChar(event) {

    var checkChar = /^[a-zA-Z]+$/.test(event.key);
    if (checkChar && event.keyCode !== 13) {
        return true;
    } else if (event.keyCode === 27) {
        event.preventDefault();

    } else {
        return false;

    }
}

function clearFunction() {

    remainingGuesses = 12;
    alreadyGuessedLetters = [];
    word = [];
    guessedWord = [];

    document.getElementById("guesses").innerHTML = remainingGuesses;
    document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters;
    document.getElementById("currentWord").innerHTML = guessedWord;

    return
}