/********************************************************
*********** ABANDON HOPE ALL YE WHO ENTER HERE **********
*********************************************************/


var quizQuestions = [
    {q: "genesis"},
    {q: "wham"},
    {q: "madonna"}
]

var wins = 0;
var losses = 0;
var tries = 10;
var guessLength;
var hangmanGuess;
var userGuess;
var node;
var gameStarted = false; // Has the game started? If not, then initialize
var tries=10;

document.getElementById('wins').textContent=wins; //When you first start the game, then wins and losses equal to 0, Because reasons!
document.getElementById('losses').textContent=losses; //When you first start the game, then wins and losses equal to 0, Because reasons!

    //CONTINUE READING HERE
    //So when does a game end successfully?
    //When the user has guessed the word within his range of tries. 
    //Therefore, the logic here is: As long as there are tries available, the user can keep guessing!

    //START READING HERE
    //This function pretty much creates two tables. One with the first Q and one with Dashes. 
function initializeQuiz (item, index) {
    document.onkeyup = function(event) {
        var userInput = event.key;
        if (gameStarted!=true){
            gameStarted = true;
            //I create a table here that will have the size length
            //as the length of each element in the questions object. 
            //For starters, I will populate it with dashes, and as the game progresses
            //each successful guess will replace the dash with the letter.
            guessLength = quizQuestions[index].q; //this is an auxiliary variable which I use to take each attribute in the objext and split it
            hangmanGuess = guessLength.split(""); //word split and stored! Woohoo!
            userGuess = [guessLength];

            node = document.getElementById('dashes'); //GRAB 'EM BY THE DASHES!
            for (var i=0; i<hangmanGuess.length; i++) {
                console.log("inside for",i);
                userGuess[i]="-";  //Initiates the dashes
                var writeDashes = document.createTextNode(userGuess[i]);
                node.appendChild(writeDashes);  // writing this to the html file! I almost cried this worked!
            }
        } else if (gameStarted){ //Game started, great! Let's play!
            console.log("inside else if", gameStarted);
                if (tries>0){
                    if (hangmanGuess === userGuess) {
                        wins++;
                        document.getElementById('game-message').textContent = "You won!";
                        document.getElementById('wins').textContent = wins;

                        return;
                        //get to the next word
                        //return and move to the next word
                    } else {
                        document.getElementById('game-message').textContent = "Guess a letter"; //Friendly message on the screen
                        if (hangmanGuess.indexOf(userInput)>=0){
                            console.log("does it ever get better?", gameStarted);
                            var x=hangmanGuess.indexOf(userInput);
                            console.log(userInput);
                            userGuess[x]=userInput; 
                            //look for other instances of the same letter
                            for (var y=x; y<hangmanGuess.length;y++){
                                y = hangmanGuess.indexOf[userInput+x];
                                console.log(userInput, " found in ", y);
                                userGuess[y]=userInput;
                            }
                            document.getElementById('dashes').textContent = userGuess; //Friendly message on the screen
                        } 
                    }
                    tries--;
                    document.getElementById('letters-guessed').append(userInput+", ");
                    document.getElementById('guesses-remaining').textContent=tries;
             } 
             losses++;
             document.getElementById('game-message').textContent = "You lost!";
             document.getElementById('losses').textContent = losses;
             return;

            }
        }
    }
     
//quizQuestions.forEach(initializeQuiz);  
initializeQuiz(quizQuestions, 0);