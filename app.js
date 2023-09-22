// Letters
const letters = "abcdefghijklmnopqrstuvwxyz"

//Get Array From Letters

let lettersArray = Array.from(letters);

// Select letters container
let lettersContainer = document.querySelector(".letters")

//Generate Letters
lettersArray.forEach(letter => {
    // create span
    let span = document.createElement("span")

    //Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    //Append The letter To Span
    span.appendChild(theLetter);

    //Add Class on Span
    span.className = 'letter-box';

    //Append Span To the lettere containeer
    lettersContainer.appendChild(span);
})

//object of Word + categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prrestige", "Inception", "Parasite", "Interstellar", "Wiplash", "Memento", "Coco", "UP"],
    people: ["Albert Einstein", "hitchock", "Alexader", "Cleopatra", "Mahatma", "Ghandi"],
    countries: ["Syria", "Palastine", "Yemen", "Egypt", "Bahrin", "Qatar"]
}

//Get Random Property
let allKeys = Object.keys(words);

//Random Number Depend On key legnth
let randomPropNumber = Math.floor(Math.random() * allKeys.length)
// Category
let randomPropName = allKeys[randomPropNumber];
//Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words 
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length)

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber]

//set category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

//Convert Chosern Word To Array
let letterAndSpace = Array.from(randomValueValue);

//Create Spans Depend On Letters
letterAndSpace.forEach(letter => {
    //Create Empty Span
    let emptySpan = document.createElement("span");

    //if letter is space
    if (letter = '') {
        //Add Class To The Span
        emptySpan.className = "has-space";

    }
    //Append spans to letters gues container
    lettersGuessContainer.appendChild(emptySpan);

})

//Select Guess spans
let guessSpans = document.querySelectorAll(".letters-guess span")

//Set wrong Attempts
let wrongAttempts = 0;

//Select the Draw Element 
let theDraw = document.querySelector(".hangman-draw");

//Handle Clicking On Letters
document.addEventListener("click", (e) => {
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");

        //Set The Chose Status
        let theStatus = false;

        // Get Clicked Letter
        let theClickedLetter = e.target.innerHTML.toLowerCase()

        // The Chosen Word 
        let theChosenWord = Array.from(randomValueValue.toLowerCase());

        // console.log(letterAndSpace); //Chosen Word

        theChosenWord.forEach((wordLetter, WordIndex) => {
            //if the clicked letter equal to one of the chosen word letter
            if (theClickedLetter == wordLetter) {

                // Set Status To Correct
                theStatus = true;

                // console.log(`Found At Index Number ${WordIndex}`)

                //loop on all spans
                guessSpans.forEach((span, spanIndex) => {

                    if (WordIndex == spanIndex) {
                        span.innerHTML = theClickedLetter;
                    }

                })

            }
            // else {
            //     theStatus = false;
            // }
        })

        //Outside Loop

        //if letter is wrong
        if (theStatus !== true) {

            //Increase the wrong attempts
            wrongAttempts++;

            //Add Class Wrong To The Draw Element
            theDraw.classList.add(`wrong-${wrongAttempts}`);

            if (wrongAttempts === 8) {

                endGame();

                lettersContainer.classList.add("finished");
            }
        }
    }
});

//End Game Function
function endGame() {
    // Create Popup Div
    let div = document.createElement("div")

    //Create Text
    let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

    //Append Text To Div
    div.appendChild(divText);

    // Add Class To Div
    div.className = `popup`;

    //Append To The Body
    document.body.appendChild(div);
}