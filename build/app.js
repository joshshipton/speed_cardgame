// need to make buttons to flip piles if theres no valid moves

let rawPile = [];
let currentHand = [];
let leftPile = [];
let rightPile = [];
let pileIndex;
let player1;
let player2;

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

  // 15 cards in a pile

  // make the pile
  while (rawPile.length < 15) {
    const card = player1.shift();
    rawPile.push(card);
  }

  // makes them into an array of arrays

  for (let i = 5; i >= 1; i--) {
    currentHand.push(rawPile.slice(0, i));
    rawPile = rawPile.slice(i);
  }
}

let $image;

function updateStacks() {
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
            console.log(
              leftPile[leftPile.length - 1],
              leftPile[leftPile.length - 2]
            );
            if (
              checkValid(
                leftPile[leftPile.length - 1],
                leftPile[leftPile.length - 2]
              )
            ) {
              console.log("order is ok and the card is allowed there");
            } else {
              $(dropped).draggable("option", "revert", true);
              leftPile.pop();
              return;
            }
          }
        }

        if (i == 1) {
          rightPile.push(imgName);
          if (rightPile.length > 1) {
            console.log(
              rightPile[rightPile.length - 1],
              rightPile[rightPile.length - 2]
            );
            if (
              checkValid(
                rightPile[rightPile.length - 1],
                rightPile[rightPile.length - 2]
              )
            ) {
              console.log("order is ok and the card is allowed there");
            } else {
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

        // delete the dropped element from the array
        // add the new element
        // save the old element so we can check the logic when comparing it to the new element

        let lastChar = originalParent.slice(-1);
        let delIndex = parseInt(lastChar) - 1;
        currentHand[delIndex].splice(0, 1);

        console.log(leftPile);

        pile.append(dropped);

        dropped.draggable("disable");

        // this is temporary need to fix this
        updateStacks();
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

        // append image

        $(`#stack${i + 1} img`).append(imgName);

        // delete from original stack
        let lastChar = originalParent.slice(-1);
        let delIndex = parseInt(lastChar) - 1;
        currentHand[delIndex].splice(0, 1);

        // add to new stack
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
  console.log(currentIndex, NewIndex);

  if (currentIndex - NewIndex === 1 || currentIndex - NewIndex === -1) {
    console.log("order ok");
    return true;
  } else {
    console.log("not ok");
    return false;
  }
}

prepareCards();
updateStacks();
makeDragable();

// get button in html tick
// now we need to make it so when the button is flipped the two piles change from the first card in the player 2 hands

console.log(player1, player2);

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
    // update images as well
    // remove the current image

    $("#pile2").empty();
    //display new image

    rightPileSrc = `cards/${rightPile[rightPile.length - 1]}.svg`;

    rightImage = $("<img>").attr("src", rightPileSrc);

    $("#pile2").append(rightImage);
  }

  if(player1.length == 0 && player2.length == 0){
    alert('no more cards in stack')
  }
});

// need to make it so that same cards can be stacked on top of one another

// need to make it so that theres a really shitty ai that players player 2 can just set it to delay

// make css better

// make rounds and distribute cards baseed on who won (got rid of all cards first)


