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

    //CONTINUE READING HERE
    //So when does a game end successfully?
    //When the user has guessed the word within his range of tries. 
    //Therefore, the logic here is: As long as there are tries available, the user can keep guessing!
    function hangmanTheGame (targetWord, userGuess) {
        document.getElementById('game-message').textContent = "Guess a letter"; //Friendly message on the screen
        var tries = 2*targetWord.length; // How many tries does the user have? let's say twice the word length, fair?
        document.onkeyup(function(event){
            userInput = event.key;
            while (tries>0) { // while you still have tries, play!
                var x = hangmanGuess.indexOf(userInput); // let's assign a variable,  I know it's not code economy, but it's too long
                if (x!=-1){ //if the input is indeed a letter in the word
                    userGuess[x]=userInput; // replace the respective dash with letter
                    console.log(userGuess[x]);
                    for (var i = 0; i < userGuess.length; i++){ //print the updated dashes table baby!
                        console.log(i);
                    }
                    tries--; //one less try tho :(
                } else {
                    tries--; //nooooooooooo
                }   
            }
        });
    }

    //START READING HERE
    //This function pretty much creates two tables. One with the first Q and one with Dashes. 
    function initializeQuiz (item, index) {
        var gameStarted = false; // Has the game started? If not, then initialize
        document.onkeyup = function(event) {
            if (gameStarted!=true){
                gameStarted = true;
                console.log(gameStarted);
                var userInput = event.key;
                console.log(userInput);
                document.getElementById('wins').textContent=wins //When you first start the game, then wins and losses equal to 0, Because reasons!
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
            hangmanTheGame(hangmanGuess, userGuess);
            }
        
        }
    }
     
     //quizQuestions.forEach(initializeQuiz);  
    initializeQuiz(quizQuestions, 0);