// Grab the overlay

const overlay = document.querySelector("#overlay");

// Grab the onscreen keyboard
const keyboard = document.querySelector("#qwerty");

// Grab the phrase to be guessed.
const winningPhrase = document.querySelector("#phrase");

// Start the counter for letters guessed incorrectly.
let missed = 0; // This counter will max at 5, then the player loses.

// Grab the "Start Game" button, and set the game board up on click.
const startGame = document.querySelector(".btn__reset");
startGame.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Set random list of phrases to guess.
const phrases = [
    "Happy Coding",
    "Never Give Up",
    "Let it Go",
    "Piece of Cake",
    "Back to Square One"
];

// Randomly choose a phrase!
function getRandomPhraseAsArray(phrases) {
  // Randomly choose a phrase from 'phrases' array.
  const chosenPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  // Turn the characters of the randomly chosen phrase into an array
  const chosenLetters = chosenPhrase.split('');

  // Allow this new array to be used.
  return chosenLetters;
}

// Take 'chosenLetters' array and post the characters to the page.
function addPhraseToDisplay(arr) {
  // Grab the ul to put the phrase characters in
  const ul = document.querySelector("#phrase > ul");

  // Grab the array of characters in the phrase
  const phrase = arr;

  for(i = 0; i < phrase.length; i++) {
    const li = document.createElement('li');
    if(phrase[i] !== " ") {
      
      li.className = 'letter';
      li.textContent = phrase[i];

      ul.append(li);
    } else {
      li.className = "space";
      li.innerHTML = '&nbsp;';
      ul.append(li);
      
    }
  }
}

// Produce the randomly chosen phrase to the page!
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Grab all elements with the class "letter".
const letters = document.querySelectorAll('.letter');
// To check a guess against the chosen array.
function checkLetter(button) {
  // To reset the match confirmation every time this fires.
  let matched = null;
  // Loop through each letter in the phrase.
  letters.forEach(letter => {
    // Check each letter in the phrase against the letter selected.
    if (button === letter.textContent.toLowerCase()) {
      // If matched, provide styling to show the correct letter in the phrase.
      letter.classList.add("show");
      // Confirm match.
      matched = true;
    }
  });

  return matched;
}

// Set the score check
const checkWin = () => {
  // Grab all letters in the phrase with the class "show"
  const shownLetters = document.querySelectorAll("show");

  if (missed === 5) {
    // if you lose all the hearts, game ends.
    
  } else if (shownLetters === letters) {
    // If all letters in the phrase have the class "show" you win!
    overlay.style.display = "initial";
    overlay.classList.add("win");
  }
};

// Create event to trigger check when user selects a letter.
keyboard.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // Update the selected button's style to show that it was selected.
    event.target.className = "chosen";
    // Make sure you can't select it again!
    event.target.disabled = true;
    // Run the check!
    const letterFound = checkLetter(event.target.textContent.toLowerCase());

    // Adjust score based on match confirmation.
    if (!letterFound) {
      // Add to the 'missed' score
      missed++;

      // Grab the first live heart under the class 'tries'
      let heart = document.querySelector('.tries');
      // Lose a heart (aka change the heart image to a lost heart).
      heart.remove();
    }
  }
  // Check score
  checkWin();
});