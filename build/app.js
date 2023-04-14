// randomise all cards in array
// split array in two
// set players cards to one array with 5 smaller arrays in it eg [[1,2,3,4,5][1,2,3,4]etc]
// render cards into html using the dom
// add event listners so cards can be placed in piles
// create logic so that checks if card is either + or -1 of card that is currently placed
// make cards dragable and upadte logic if cards are within 1 index of one another

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

// shuffle the list
cards.sort(() => Math.random() - 0.5);

// splits deck for two players
const splitIndex = Math.floor(cards.length / 2);
let player1 = cards.slice(0, splitIndex);
let player2 = cards.slice(splitIndex);

// 15 cards in a pile

let rawPile = [];
let pile = [];

// make the pile array of m[] with 5 arrays
while (rawPile.length < 15) {
  const card = player1.shift();
  rawPile.push(card);
}

// makes them into an array

for (let i = 5; i >= 1; i--) {
  pile.push(rawPile.slice(0, i));
  rawPile = rawPile.slice(i);
}
console.log(pile);

// render to dom
// 'div is called 'stacks''
// each box is called stacks[i] 1-5

let stack1 = document.getElementById("stack1");
let stack2 = document.getElementById("stack2");
let stack3 = document.getElementById("stack3");
let stack4 = document.getElementById("stack4");
let stack5 = document.getElementById("stack5");

let pile1 = document.getElementById("pile1");
let pile2 = document.getElementById("pile2");

let $image;

function updateStacks() {
  for (let i = 0; i < 5; i++) {
    let pileIndex = pile[i][0];
    console.log(pileIndex);
    let imgSrc = `cards/${pileIndex}.svg`;
    $image = $("<img>").attr("src", imgSrc);
    $image.draggable({
      revert: "invalid"
    });
    $(`#stack${i + 1}`).append($image);
  }
}

function makeDragable(){
  for(let i=0;i<2;i++){
    $(`#pile${i+1}`).droppable({
      drop: function(event, ui){
        let dropped = ui.draggable;
        $(this).append(dropped);
      }
    })
  }

}

updateStacks();
makeDragable();
