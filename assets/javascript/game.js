/********************************************************
*********** ABANDON HOPE ALL YE WHO ENTER HERE **********
*********************************************************/


var quizQuestions = [
    {q: "genesis"},
    {q: "wham"},
    {q: "madonna"}
]

var wins=0;
var losses=0;
var tries = 10;
var guessLength;
var hangmanGuess;
var userGuess;
var questionId=0;
var gameStarted = false; // Has the game started? If not, then initialize
var tries=10;

document.getElementById('wins').textContent=wins; //When you first start the game, then wins and losses equal to 0, Because reasons!
document.getElementById('losses').textContent=losses; //When you first start the game, then wins and losses equal to 0, Because reasons!

    //START READING HERE
    //This function pretty much creates two tables. One with the first Q and one with Dashes. 
function initializeQuiz (item, index) {
    document.onkeyup = function(event) {
        var userInput = event.key;
        if (gameStarted!=true){
            //I create a table here that will have the size length
            //as the length of each element in the questions object. 
            //For starters, I will populate it with dashes, and as the game progresses
            //each successful guess will replace the dash with the letter.
            guessLength = quizQuestions[index].q; //this is an auxiliary variable which I use to take each attribute in the objext and split it
            hangmanGuess = guessLength.split(""); //word split and stored! Woohoo!
            userGuess = [];
            for (var i=0; i<hangmanGuess.length; i++) {
                userGuess[i]="-";  //Initiates the dashes
            }
            document.getElementById('letters-guessed').textContent="";
            document.getElementById('dashes').textContent = userGuess;
            document.getElementById('game-message').textContent = "Guess a letter"; //Friendly message on the screen        
            document.getElementById('losses').textContent = losses;
            document.getElementById('wins').textContent = wins; 
            gameStarted = true;
            return;
        } else if (gameStarted){ //Game started, great! Let's play!  {}
            //So when does a game end successfully?
            //When the user has guessed the word within his range of tries. 
            //Therefore, the logic here is: As long as there are tries available, the user can keep guessing!
            console.log("Starting the game, 1st time?");
            if (tries>0){
                console.log(hangmanGuess + " vs " + userGuess);
                if (hangmanGuess.join("") === userGuess.join("")) {
                    wins++;
                    document.getElementById('game-message').textContent = "You won!";
                    document.getElementById('wins').textContent = wins;
                    gameStarted=false;
                    console.log(gameStarted, " Game won!!!");
                    initializeQuiz(quizQuestions, questionId++);
                    return;
                //get to the next word
                //return and move to the next word
                } else {
                    if (hangmanGuess.indexOf(userInput)>=0){
                        var x=hangmanGuess.indexOf(userInput);
                        //look for other instances of the same letter and replace
                        for (var y=x; y<hangmanGuess.length;y++){
                            if (hangmanGuess[y]===userInput){
                                userGuess[y]=userInput;
                            }
                        }
                        document.getElementById('dashes').textContent = userGuess; //Friendly message on the screen
                        tries--;
                    } 
                
                document.getElementById('letters-guessed').append(userInput+", ");
                document.getElementById('guesses-remaining').textContent=tries;
                console.log("Still trying inside else");
                return;
                }
            } else {
                losses++;
                document.getElementById('game-message').textContent = "You lost!";
                document.getElementById('losses').textContent = losses;
                console.log("You lost, where does this go?");
                gameStarted=false;
                tries=10;
                return;
                //you lost, move to the next word
            } 
        }
    }
}
     
//quizQuestions.forEach(initializeQuiz, questionid);  

initializeQuiz(quizQuestions,questionId);
