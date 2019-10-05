/********************************************************
*********** ABANDON HOPE ALL YE WHO ENTER HERE **********
*********************************************************/


var quizQuestions = [
    {q: "Genesis"},
    {q: "Wham"},
    {q: "asdeg"},
    {q: "Madonna"}
]

var wins = 0;
var losses = 0;
var tries = 10;

    //CONTINUE READING HERE
    //So when does a game end successfully?
    //When the user has guessed the word within his range of tries. 
    //Therefore, the logic here is: As long as there are tries available, the user can keep guessing!
    function hangmanTheGame (targetWord, userGuess) {
        document.getElementById('game-message').textContent = "Guess a letter"; //Friendly message on the screen
        while (tries>0){
            if (targetWord === userGuess) {
                return true;
                //get to the next word
                //return and move to the next word
            } else {
                document.onkeyup(function(e){
                    var userInput = e.key;
                    if (targetWord.indexOf(userInput)>-1){
                        var x=targetWord.indexOf(userInput);
                        console.log(userInput);
                        userGuess[x]=userInput;
                        document.getElementById('dashes').textContent = userGuess; //Friendly message on the screen
                    } 
                    document.getElementById('letters-guessed').append(userInput+", ");
                });
            }
            tries--;
            document.getElementById('guesses-remaining').append(tries);
        }
        //You lost
        return false;
    }

    //START READING HERE
    //This function pretty much creates two tables. One with the first Q and one with Dashes. 
    function initializeQuiz (item, index) {
        var gameStarted = false; // Has the game started? If not, then initialize
        document.onkeyup = function(event) {
            if (gameStarted!=true){
                gameStarted = true;
                console.log(gameStarted);
                document.getElementById('wins').textContent=wins; //When you first start the game, then wins and losses equal to 0, Because reasons!
                document.getElementById('losses').textContent=losses; 
                //I create a table here that will have the size length
                //as the length of each element in the questions object. 
                //For starters, I will populate it with dashes, and as the game progresses
                //each successful guess will replace the dash with the letter.
                var guessLength = quizQuestions[index].q; //this is an auxiliary variable which I use to take each attribute in the objext and split it
                var hangmanGuess = guessLength.split(""); //word split and stored! Woohoo!
                var userGuess = []; //I'm going to initiate this table with dashes

                var node = document.getElementById('dashes'); //GRAB 'EM BY THE DASHES!
                for (var i=0; i<hangmanGuess.length; i++) {
                    userGuess[i]="-";  //stores the dashes
                    var writeDashes = document.createTextNode(userGuess[i]);
                    node.appendChild(writeDashes);  // writing this to the html file! I almost cried this worked!
                }
            } else if (gameStarted){ //Game started, great! Let's play!
            if (hangmanTheGame(hangmanGuess, userGuess)){
                wins++;
                document.getElementById('game-message').textContent = "You won!"; //Friendly message on the screen
                return;
            } else {
                losses++;
                document.getElementById('game-message').textContent = "You lost!"; //Friendly message on the screen
                return;
            }
            }
        }
    }
     
     //quizQuestions.forEach(initializeQuiz);  
    initializeQuiz(quizQuestions, 0);