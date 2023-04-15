// randomise all cards in array
// split array in two
// set players cards to one array with 5 smaller arrays in it eg [[1,2,3,4,5][1,2,3,4]etc]
// render cards into html using the dom
// add event listners so cards can be placed in piles
// create logic so that checks if card is either + or -1 of card that is currently placed
// make cards dragable and upadte logic if cards are within 1 index of one another
let rawPile = [];
let currentHand = [];
let leftPile = [];
let rightPile = [];
let pileIndex;

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
  let player1 = cards.slice(0, splitIndex);
  let player2 = cards.slice(splitIndex);

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
          // need to somehow get the card that was just added to the pile and append it here
          leftPile.push(imgName);
          // if empty it can go easy
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
              leftPile.pop()
              return;
            }
          }
        }
        
        if (i == 1) {
          // need to somehow get the card that was just added to the pile and append it here
          rightPile.push(imgName);
          // if empty it can go easy
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
              rightPile.pop()
              return;
            }
          }
        }


        //  the array doesnt need to store more than 2 arrays at a time right

        // now LOGIC

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
  }
}

function checkValid(current, newcard) {
  // the 10 is a 1 cause we are only reading the first char of the cards
  let order = ["2", "3", "4", "5", "6", "7", "8", "9", "1", "j", "q", "k", "a"];
  currentCard = current[0];
  newCard = newcard[0];

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
