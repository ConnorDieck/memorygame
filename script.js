const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let flippedCards = [];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  let clickedCard = event.target;
  flippedCards.push(clickedCard);

  if(flippedCards.length < 2) { // Only flip the cards if the number of flipped cards is 0 or 1
    clickedCard.style.backgroundColor = clickedCard.className;
  } else if (flippedCards.length === 2) {
    clickedCard.style.backgroundColor = clickedCard.className;
    if (flippedCards[0].className === flippedCards[1].className) { // If the classnames are the same, proceed
      if(flippedCards[0].offsetLeft === flippedCards[1].offsetLeft && flippedCards[0].offsetTop === flippedCards[1].offsetTop) { // Check to see if it was the same card clicked twice. If so, remove the second click from the array of flipped cards
        flippedCards.length = 1;
      } else { // Cards match, clear flipped cards and remove event listeners from matching pair
        flippedCards[0].removeEventListener('click', handleCardClick);
        flippedCards[1].removeEventListener('click', handleCardClick);
        flippedCards = [];
      } 
    } else { // If the classNames are different, flip both cards back over after one second
      setTimeout(
        function(){
          flippedCards[0].style = null;
          flippedCards[1].style = null;
          flippedCards = []
        }, 1000);
    }

  } else {
    // Do nothing
  }

}


// when the DOM loads
createDivsForColors(shuffledColors);
