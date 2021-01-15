// this is an intermediate state of js file while in the project development.

var cardsArray = [
  {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
  {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
  {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
  {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
  {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
  {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
  {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
  {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
  {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
  {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
  {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
  {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
];

// Duplicate cardsarray
var gameGrid = cardsArray.concat(cardsArray); // 'concat' method adds the array passed in parameter to the array where function is called.
// randomise the position of cards in the array.
gameGrid.sort(function(){
  return 0.5 - Math.random(); // Math.random() returns a decimal between 0 and 1.
});

// get the root div
var game = document.getElementById('game-board');
// create a section element for grid
var grid = document.createElement('section');
// set grid element's class to grid
grid.setAttribute('class','grid');
// add grid to the root div
game.appendChild(grid);

var count = 0;
var firstGuess = '';
var secondGuess = '';
var previousTarget = '';
var delay = 600;

var match = function() {
  var selected = document.querySelectorAll('.selected');

  for (i = 0; i < selected.length; i++) {
    selected[i].classList.add('match');
  }
}

// loop through cards array and 
for (var i = gameGrid.length - 1; i >= 0; i--) {
  // create a div element and assign to variable card
  var card = document.createElement('div');
  // Apply card class to the div
  // card.setAttribute('class','card');
  card.classList.add('card');
  // Set data-name attribute of the div to cardsArray name
  card.dataset.name = gameGrid[i].name;
  // apply bg-image of the div to the cardsArray image
  card.style.backgroundImage = `url(${gameGrid[i].img})`;
  // Append the div to the grid section
  grid.appendChild(card);
};

// reset guesses after 2 selections
var resetGuesses = function() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = '';

  var selected = document.querySelectorAll('.selected');
  for (var i = 0; i < selected.length; i++) {
     selected[i].classList.remove('selected');
   }
}

//add event listener to grid
grid.addEventListener('click',function(event) {
  console.log('event');
  // capture clicked item
  var clicked = event.target;
  console.log('class '+clicked.parentNode.classList);
  console.log(clicked == previousTarget);
  // remove the grid section from selection
  if(clicked.nodeName == 'SECTION' || clicked == previousTarget) { // || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
    console.log('no action');
    return;
  }
  // add selected class to the item only if less than 2 cards are selected
  if (count < 2){
    count ++;
    if (count == 1) {
      firstGuess = clicked.dataset.name
      clicked.classList.add('selected');
      previousTarget = clicked;
    } else {
      secondGuess = clicked.dataset.name;
      clicked.classList.add('selected');

      if (firstGuess == secondGuess && firstGuess != '') {
        setTimeout(match, delay);   // setTimeout method is used to delay a function call. The parameters are method name without () and the delay time in millisecs.
      }
      setTimeout(resetGuesses, delay);
    }
  }
});
