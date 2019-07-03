var wordsList = ["VEGETABLES", "MONASH", "PEOPLE", "GLOBAL", "SURRENDER"]

var word = [];
var guessedWord = [];

var flag = false;

var winner = 0;
var remainingGuesses = 12;
var alreadyGuessedLetters = [];


function whenKeypressed() {

    document.getElementById("started").innerHTML = ": Game Started!";
    document.getElementById("started").style.color = "red";

    document.getElementById("userwins").innerHTML = winner;
    document.getElementById("userwins").style.color = "blue";


    document.getElementById("currentWord").style.color = "blue";

    document.getElementById("guesses").innerHTML = remainingGuesses;
    document.getElementById("guesses").style.color = "blue";

    document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters;
    document.getElementById("alreadyguessed").style.color = "blue";

    if (!flag) {
        generateRandomWords();
        flag = true;
    }
}

document.onkeypress = function (event) {

    var c = (event.key).toUpperCase();
    // Update the interface for the user
    whenKeypressed();

    for (let index = 0; index <= alreadyGuessedLetters.length; index++) {
        if (!alreadyGuessedLetters.includes(c) && checkInputChar(event) && remainingGuesses > 0 && word !== guessedWord) {
            alreadyGuessedLetters.push(c)
            checkForCurrentWord(c);
            document.getElementById("guesses").innerHTML = --remainingGuesses;
            document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters

        } else if(remainingGuesses <= 0) alert("You lose")

    }

}


function checkForCurrentWord(c) {
    for (let index = 0; index < word.length; index++) {
        // console.log(word.charAt(index)+" CCCC: "+c)
        // console.log(word)
        if (c == word[index]) {
            guessedWord[index] = c;
            document.getElementById("currentWord").innerHTML = guessedWord;

            if(!guessedWord.includes("-")){
                alert("You won")
                winner++;
                return;
            }
        }
        
        console.log("::::::"+guessedWord[index])

    }

    console.log("kalsdj:::"+guessedWord)
    
}

function generateRandomWords() {
    var temp = wordsList[Math.floor(Math.random() * wordsList.length)];
    word = temp.split('')
    // document.getElementById("currentWord").innerHTML = word;

    for (let index = 0; index < word.length; index++) {
        guessedWord.push("-")
    }
    document.getElementById("currentWord").innerHTML += guessedWord;

}

function checkInputChar(event) {

    var checkChar = /^[a-zA-Z]+$/.test(event.key);
    if (checkChar && event.keyCode !== 13) {
        return true;
    } else {
        return false;
    }
}

