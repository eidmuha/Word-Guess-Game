var wordsList = ["VEGETABLES", "MONASH", "PEOPLE", "GLOBAL", "SURRENDER"]

var word = [];
var guessedWord = [];

var flag = false;
var iamWinner = false;
var gameStarted = false;

var winner = 0;
var remainingGuesses = 12;
var alreadyGuessedLetters = [];



function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }





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

   
}



document.onkeypress = function (event) {

    playAudio();
    var c = (event.key).toUpperCase();
    // Update the interface for the user

    if (!flag) {
        whenKeypressed();
        generateRandomWords();
        flag = true;
    }

    if(gameStarted === false){
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

    if(remainingGuesses<=0){

        setTimeout(alert("You lost"), 90000)
        // alert ("You lose")
        remainingGuesses = 12;
        alreadyGuessedLetters = [];
        word = [];
        guessedWord = [];
        
        document.getElementById("guesses").innerHTML = remainingGuesses;

        document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters;
        document.getElementById("currentWord").innerHTML = guessedWord;     
        flag = false;

        return
    }

    

}

// checks if the current character is maching
function checkForCurrentWord(c) {
    for (let index = 0; index < word.length; index++) {
        
        if (c == word[index]) {
            guessedWord[index] = c;
            document.getElementById("currentWord").innerHTML = guessedWord;     
            
            if(!guessedWord.includes("-")){
                if(iamWinner==false) {
                    
                    alert("You won")
                    iamWinner=true;
                    remainingGuesses = 12;
                    alreadyGuessedLetters = [];
                    word = [];
                    guessedWord = [];
                    
                    document.getElementById("guesses").innerHTML = remainingGuesses;

                    document.getElementById("alreadyguessed").innerHTML = alreadyGuessedLetters;
                    document.getElementById("currentWord").innerHTML = guessedWord;     
                    flag = false;

                }
                // iamWinner = true;
                document.getElementById("userwins").innerHTML = ++winner;
                return;
            }
        }

       
        
        console.log("::::::"+guessedWord[index])

    }

    console.log("kalsdj:::"+guessedWord)
    
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
    } else {
        return false;
    }
}


