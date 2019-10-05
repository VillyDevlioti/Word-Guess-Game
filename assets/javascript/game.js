/********************************************************
*********** ABANDON HOPE ALL YE WHO ENTER HERE **********
*********************************************************/


var quizQuestions = [
    {q: "genesis", img: "./assets/images/genesis.jpg"},
    {q: "wham", img: "./assets/images/wham.jpg"},
    {q: "madonna", img:"./assets/images/madonna.jpg"},
    {q: "duran duran", img: "./assets/images/duranduran.jpg"},
    {q: "inxs", img: "./assets/images/inxs.jpg"},

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
    console.log(questionId,"inside initialize");
    document.onkeyup = function(event) {
        console.log(questionId,"inside onkeyup");
        var userInput = event.key;
        if (gameStarted!=true){ 
            //Game initialization
            //I create a table here that will have the size length
            //as the length of each element in the questions object. 
            //For starters, I will populate it with dashes, and as the game progresses
            //each successful guess will replace the dash with the letter.
            guessLength = quizQuestions[index].q; //this is an auxiliary variable which I use to take each attribute in the objext and split it
            hangmanGuess = guessLength.split(""); //word split and stored! Woohoo!
            userGuess = [];
            tries=10;
            for (var i=0; i<hangmanGuess.length; i++) {
                userGuess[i]="-";  //Initiates the dashes
            }
            //Initialize the screen :) 
            document.getElementById('game-message').textContent = "Guess a letter";
            document.getElementById('letters-guessed').textContent="";
            document.getElementById('dashes').textContent = userGuess;
            document.getElementById('losses').textContent = losses;
            document.getElementById('wins').textContent = wins; 
            document.getElementById('guesses-remaining').textContent=tries;
            //initialize the game
            gameStarted = true;
            console.log(questionId,"inside if game is not true");
            return; //return back to the condition, so that we can start guessing
        } else if (gameStarted){ 
            //after the game is initialized, time to play!
            console.log(questionId,"inside if game is true");
            if (tries>0){
                if (hangmanGuess.join("") === userGuess.join("")) {
                    wins++;
                    document.getElementById('game-message').textContent = "You won! Press any key for next word";
                    imageSource="<img src=\""+quizQuestions[questionId].img+"\"\>"; //temporary var to hold the image
                    document.getElementById('music-band').innerHTML=imageSource;
                    console.log(imageSource);
                    document.getElementById('wins').textContent = wins;
                    gameStarted=false;
                    console.log(questionId,"inside won");
                    questionId+=1; //moving on to the next question
                    initializeQuiz(quizQuestions, questionId);
                //get to the next word
                //return and move to the next word
                } else {
                    //if the letter is found in the word
                    if (hangmanGuess.indexOf(userInput)>=0){
                        var x=hangmanGuess.indexOf(userInput); 
                        //look for other instances of the same letter and replace
                        for (var y=x; y<hangmanGuess.length;y++){
                            if (hangmanGuess[y]===userInput){
                                userGuess[y]=userInput;
                            }
                        }
                        document.getElementById('dashes').textContent = userGuess; //update and show user guess status
                        document.getElementById('game-message').textContent = "Guess a letter"; //Friendly message on the screen        
                    } 
                tries--;
                document.getElementById('letters-guessed').append(userInput+", ");
                document.getElementById('guesses-remaining').textContent=tries;
                console.log(questionId,"inside tries");
                return;
                }
            } else {
                losses++;
                document.getElementById('game-message').textContent = "You lost! Press any key for next word";
                document.getElementById('losses').textContent = losses;
                gameStarted=false;
                tries=10;
                console.log(questionId,"inside lost");
                questionId+=1; //moving on to the next question
                initializeQuiz(quizQuestions, questionId);
                //you lost, move to the next word
            } 
        }
    }
}

initializeQuiz(quizQuestions,questionId);
