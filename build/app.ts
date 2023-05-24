// refactoring code and for fun redoing it in TS
import $ from 'jquery';

let humanPlayerHand: string[][] = [];
let computerPlayerHand: string[][] = [];


const playingCards: string[] = [
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


function makeDecks(){
  playingCards.sort(() => Math.random() - 0.5);
  // Split deck into two players
  const splitIndex = Math.floor(playingCards.length / 2);
  let humanPlayerCards = playingCards.slice(0, splitIndex);
  let computerPlayerCards = playingCards.slice(splitIndex)

  // make into piles of 15 for each persons first hand
  let rawHumanPlayerHand = humanPlayerCards.slice(0,15);
  let rawComputerPlayerHand = computerPlayerCards.slice(0,15);

  // make into the arrays of the arrays for the decks
    for (let i = 5; i >= 1; i--) {
      humanPlayerHand.push(rawHumanPlayerHand.slice(0, i));
      computerPlayerHand.push(rawComputerPlayerHand.slice(0,i));

      rawHumanPlayerHand = rawHumanPlayerHand.slice(i);
      rawComputerPlayerHand = rawComputerPlayerHand.slice(i);
    }

    console.log(humanPlayerHand)
}

// place cards in their boxes

function renderCards(){

  for(let i=0;i<5;i++){
    // if no cards 
    if($(`#stack${i + 1}`).children().length == 0){
      let humanCardIndex = humanPlayerHand
    }
  }

}

makeDecks();