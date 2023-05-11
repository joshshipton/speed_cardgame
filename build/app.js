// need to make buttons to flip piles if theres no valid moves

// today when a round is over distribute bigger pile to loser and smaller pile to winner, have a pop up with you won, bigger deck x cards smaller deck y cards and then a button to "go next round"

let rawPile = [];
let oppRawPile = [];

let oppCurrentHand = [];
let currentHand = [];
let leftPile = [];
let rightPile = [];

let oppPileIndex;
let pileIndex;
let player1;
let player2;
let card;
let $image;

let cards = [
  "10_of_clubs",
  "10_of_diamonds",
  "10_of_hearts",
  "10_of_spades",
  "2_of_clubs",
  "2_of_diamonds",
  "2_of_hearts",
  "2_of_spades",
  "3_of_clubs",
  "3_of_diamonds",
  "3_of_hearts",
  "3_of_spades",
  "4_of_clubs",
  "4_of_diamonds",
  "4_of_hearts",
  "4_of_spades",
  "5_of_clubs",
  "5_of_diamonds",
  "5_of_hearts",
  "5_of_spades",
  "6_of_clubs",
  "6_of_diamonds",
  "6_of_hearts",
  "6_of_spades",
  "7_of_clubs",
  "7_of_diamonds",
  "7_of_hearts",
  "7_of_spades",
  "8_of_clubs",
  "8_of_diamonds",
  "8_of_hearts",
  "8_of_spades",
  "9_of_clubs",
  "9_of_diamonds",
  "9_of_hearts",
  "9_of_spades",
  "ace_of_clubs",
  "ace_of_diamonds",
  "ace_of_hearts",
  "ace_of_spades",
  "jack_of_clubs",
  "jack_of_diamonds",
  "jack_of_hearts",
  "jack_of_spades",
  "king_of_clubs",
  "king_of_diamonds",
  "king_of_hearts",
  "king_of_spades",
  "queen_of_clubs",
  "queen_of_diamonds",
  "queen_of_hearts",
  "queen_of_spades",
];

function prepareCards() {
  cards.sort(() => Math.random() - 0.5);
  // splits deck for two players
  const splitIndex = Math.floor(cards.length / 2);
  player1 = cards.slice(0, splitIndex);
  player2 = cards.slice(splitIndex);
  // make the pile
  while (rawPile.length < 15) {
    const card = player1.shift();
    rawPile.push(card);
  }
  while (oppRawPile.length < 15) {
    const card = player2.shift();
    oppRawPile.push(card);
  }
  // makes them into an array of arrays
  for (let i = 5; i >= 1; i--) {
    currentHand.push(rawPile.slice(0, i));
    rawPile = rawPile.slice(i);
  }

  for (let i = 5; i >= 1; i--) {
    oppCurrentHand.push(oppRawPile.slice(0, i));
    oppRawPile = oppRawPile.slice(i);
  }
}

function updateEmptyStacks() {

  for (let i = 0; i < 5; i++) {
    if ($(`#stack${i + 1}`).children().length == 0) {
      pileIndex = currentHand[i][0];
      if (typeof pileIndex === "undefined") {
        continue;
      } else {
        let imgSrc = `cards/${pileIndex}.svg`;
        $image = $("<img>").attr("src", imgSrc);
        $(`#stack${i + 1}`).append($image);
      }
    } else {
      continue;
    }
  }
}

function updateOppEmptyStacks() {


  for (let i = 0; i < 5; i++) {
    if ($(`#oppStack${i + 1}`).children().length == 0) {
      console.log("RUNRUNRUNRUNRUN");
      oppPileIndex = oppCurrentHand[i][0];
      if (typeof oppPileIndex === "undefined") {
        console.log("problemproblemproblem");
        continue;
      } else {
        console.log("WEEWOOWEEWOOWEEWOO");
        let oppImgSrc = `cards/${oppPileIndex}.svg`;
        opp$image = $("<img>").attr("src", oppImgSrc);
        $(`#oppStack${i + 1}`).append(opp$image);
      }
    } else {
      continue;
    }
  }
}

function makeDragable() {
  for (let i = 0; i < 2; i++) {
    $(`#pile${i + 1}`).droppable({
      drop: function (event, ui) {
        let originalParent = ui.helper.data("origin");
        let dropped = ui.draggable;
        let imgSrc = dropped.attr("src");
        let imgName = imgSrc.split("/").pop().split(".")[0];
        if (i == 0) {
          leftPile.push(imgName);
          if (leftPile.length > 1) {
            if (
              !checkValid(
                leftPile[leftPile.length - 1],
                leftPile[leftPile.length - 2]
              )
            ) {
              $(dropped).draggable("option", "revert", true);
              leftPile.pop();
              return;
            }
          }
        }
        if (i == 1) {
          rightPile.push(imgName);
          if (rightPile.length > 1) {
            if (
              !checkValid(
                rightPile[rightPile.length - 1],
                rightPile[rightPile.length - 2]
              )
            ) {
              $(dropped).draggable("option", "revert", true);
              rightPile.pop();
              return;
            }
          }
        }

        let pile = $(this);
        pile.empty();
        dropped.css({
          top: 0 + "px",
          left: 0 + "px",
        });

        let lastChar = originalParent.slice(-1);
        let delIndex = parseInt(lastChar) - 1;
        currentHand[delIndex].splice(0, 1);
        pile.append(dropped);
        dropped.draggable("disable");

        // this is temporary need to fix this
        updateEmptyStacks();
        makeDragable();
      },
    });
  }
  for (let i = 0; i < 5; i++) {
    $(`#stack${i + 1} img`).draggable({
      revert: "invalid",
      start: function (event, ui) {
        $(ui.helper).data("origin", this.parentElement.id);
      },
      stop: function (event, ui) {
        if (ui.helper.dropped) {
          $(this).draggable("disable");
        }
      },
    });
    $(`#stack${i + 1} img`).droppable({
      revert: "invalid",
      drop: function (event, ui) {
        let originalParent = ui.helper.data("origin");
        let dropped = ui.draggable;

        let imgSrc = dropped.attr("src");
        let imgName = imgSrc.split("/").pop().split(".")[0];

        // check if cards are the same and if they are reveal a new card
        $(`#stack${i + 1} img`).append(imgName);

        // delete from original stack
        let lastChar = originalParent.slice(-1);
        let delIndex = parseInt(lastChar) - 1;
        card = currentHand[delIndex].splice(0, 1);

        // i have the stack its from so I can just get the first index from the array inside the array and move that to the new array of the array

        console.log(currentHand);
        console.log(card);

        // append it to the right list
        // check if theyre the same

        // add to new stack
        // need to check that theyre the same
      },
    });
  }
}

function checkValid(current, newcard) {
  // the 10 is a 1 cause we are only reading the first char of the cards
  let order = ["2", "3", "4", "5", "6", "7", "8", "9", "1", "j", "q", "k", "a"];
  currentCard = current[0];
  newCard = newcard[0];

  if (
    (currentCard == "2" && newCard == "a") ||
    (newCard == "2" && currentCard == "a")
  ) {
    return true;
  }
  currentIndex = order.indexOf(currentCard);
  NewIndex = order.indexOf(newCard);
  // console.log(currentIndex, NewIndex);

  if (currentIndex - NewIndex === 1 || currentIndex - NewIndex === -1) {
    console.log("order ok");
    return true;
  } else {
    console.log("not ok");
    return false;
  }
}

$("#button").click(function () {
  console.log("button clicked");
  // change both piles to first index of player1 and player2 decks
  if (player1.length !== 0) {
    leftPile.push(player1[0]);
    player1.shift();
    $("#pile1").empty();
    leftPileSrc = `cards/${leftPile[leftPile.length - 1]}.svg`;
    leftImage = $("<img>").attr("src", leftPileSrc);
    $("#pile1").append(leftImage);
  }
  if (player2.length !== 0) {
    rightPile.push(player2[0]);

    player2.shift();

    console.log(leftPile, rightPile);

    $("#pile2").empty();

    rightPileSrc = `cards/${rightPile[rightPile.length - 1]}.svg`;

    rightImage = $("<img>").attr("src", rightPileSrc);

    $("#pile2").append(rightImage);
  }

  if (player1.length == 0 && player2.length == 0) {
    alert("no more cards in stack");
  }
});

// made ai make moves
//  make it look at cards from left to right waiting a second before looking at the next
// if its playable then play
// if no playable cards then let it make an aniamation that it wants to flip

function aI() {
  let currentLeftCard = leftPile[leftPile.length - 1];
  let currentRightCard = rightPile[rightPile.length - 1];
  console.log(currentLeftCard, currentRightCard);

  for (let i = 0; i < oppCurrentHand.length; i++) {
    let pile = oppCurrentHand[i][0];
    if (checkValid(pile, currentLeftCard)) {
      leftPile.push(pile);
      oppCurrentHand[i].splice(0, 1);
      $(`#oppStack${i + 1}`).empty();
      $(`#pile1`).empty();
      let pileSrc = `cards/${pile}.svg`;
      let pileImage = $("<img>").attr("src", pileSrc);
      $(`#pile1`).append(pileImage);
      break;
    }
    if (checkValid(pile, currentRightCard)) {
      rightPile.push(pile);
      oppCurrentHand[i].splice(0, 1);
      $(`#oppStack${i + 1}`).empty();
      $(`#pile2`).empty();
      let pileSrc = `cards/${pile}.svg`;
      let pileImage = $("<img>").attr("src", pileSrc);
      $(`#pile2`).append(pileImage);
      break;
    }
  }

  updateOppEmptyStacks();
}


function CheckWinner(){
  // checks winner, if winner sends alert + distributes cards for the next round
  let allSubArraysAreEmpty = currentHand.every(subArray => subArray.length === 0);

  if(allSubArraysAreEmpty){
    console.log("Player has gotten rid of all their cards")
    alert(`You won, left pile had {cards} right pile had {cards} you take the right pile you know have {cards} and opponent has {cards} press ok to go to the next round`)
  }
  

}

setInterval(aI, 2000);
setInterval(CheckWinner, 2000)
setInterval(() => {
  console.log(currentHand);
}, 10000);

// start game functions
prepareCards();
updateEmptyStacks();
updateOppEmptyStacks();
makeDragable();



// to do for next time 
// implement this to check for winner and loser const arrayOfArrays = [[], [], []];

// const allSubArraysAreEmpty = arrayOfArrays.every(subArray => subArray.length === 0);

// if (allSubArraysAreEmpty) {
//   console.log("All of the sub-arrays are empty.");
// }

// can make rounds so that the game goes on for longer 
