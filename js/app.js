const phrases = [
  "What Would Jesus Do",
  "Sounds Legit",
  "Bite The Bullet",
  "Eye of the Tiger",
  "Break a Leg",
  "The Best of Both Worlds",
  "A Picture is Worth One Thousand Words",
  "The Early Bird Gets The Worm",
  "Actions Speak Louder Than Words",
  "Time Is Money",
];

let phrase, game, attemptedLetters;

// Functions
const init = () => {
  let keys = document.querySelectorAll(".key");
  let hearts = document.querySelectorAll(".tries img");
  phrase = null;
  game = null;
  attemptedLetters = Array();

  __(".section#phrase > ul").innerHTML = "";

  keys.forEach((key) => {
    key.className = "key";
    key.disabled = false;
  });

  hearts.forEach((heart) => {
    heart.src = "images/liveHeart.png";
    heart.className = "";
  });
};

const randomNumGen = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const __ = (x) => {
  return document.querySelector(x);
};

__("#btn__reset").addEventListener("click", () => {
  init();
  game = new Game(phrases);
  game.startGame();
});

__("#qwertz").addEventListener("click", (e) => {
  let isButton = e.target.tagName.toLowerCase();

  if (isButton === "button") {
    let key = e.target.innerHTML;
    game.handleInteraction(key);
  }
});

window.addEventListener("keyup", (e) => {
  let loggedKey = e.key.toLowerCase();

  if (game) {
    if (/^[a-z]{1}$/.test(loggedKey) && !attemptedLetters.includes(loggedKey)) {
      attemptedLetters.push(loggedKey);
      game.handleInteraction(loggedKey);
    }
  }
});

__("#btn__reset").className = "animated infinite bounce delay-3s slow";
