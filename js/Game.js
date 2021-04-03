/*** Treehouse FSJS Techdegree
  * Project 4 - OOP Game App
  * The Game class accepts a phrases parameter and handles showing most of the game
  * functions like choosing the random phrase and other game interactions
  * (i.e.: removing a life, checking for win/lose, determining when to end game).
  **/
class Game {
  constructor (phrases) {
    this.missed = 0;
    this.phrases = phrases;
    this.activePhrase = null;
  }

  startGame () {
    // Hide start screen overlay
    __('#overlay').style.display = 'none';

    // Get and set game phrase
    phrase = new Phrase(this.getRandomPhrase());
    this.activePhrase = phrase.phrase;
    phrase.addPhraseToDisplay();
  }

  getRandomPhrase () {
    return phrases[randomNumGen(this.phrases.length - 1)];
  }

  handleInteraction (key) {
    let splitPhraseArray = this.activePhrase.split('');
    let keys = document.querySelectorAll('button.key');
    let isCorrectLetter = phrase.checkLetter(key);

    if (isCorrectLetter) {
      phrase.showMatchedLetter();
    } else {
      game.removeLife();
    }

    // Show user keys pressed and whether it was correct or not
    keys.forEach(keyLetter => {
      if (keyLetter.innerHTML === key && isCorrectLetter) {
        keyLetter.className = 'key chosen';
        keyLetter.disabled = true;
      } else if (keyLetter.innerHTML === key && !isCorrectLetter) {
        keyLetter.className = 'key wrong';
        keyLetter.disabled = true;
      }
    });

    if (game.checkForWin()) {
      game.gameOver();
    }
  }

  removeLife () {
    let hearts = document.querySelectorAll('.tries img');
    this.missed = this.missed + 1;
    hearts[5 - this.missed].src = 'images/lostHeart.png';
    hearts[5 - this.missed].className = 'animated heartBeat';

    if(this.missed >= 5) {
      game.gameOver();
    }
  }

  checkForWin () {
    let totalLetters = document.querySelectorAll('li.letter');
    let shownLetters = document.querySelectorAll('li.show.letter');

    if (shownLetters.length === totalLetters.length) {
      return true;
    }

    return false;
  }

  gameOver () {
    let won = game.checkForWin();

    if (won) {
      __('#overlay').className = 'win';
      __('#game-over-message').textContent = 'Congratulations! You won! :D';
    } else {
      __('#overlay').className = 'lose';
      __('#game-over-message').textContent = 'Game Over! You lost all your hearts ;(';
    }
    __('#overlay').style.display = 'flex';
    __('#btn__reset').textContent = 'Start New Game';

    init();
  }
}
