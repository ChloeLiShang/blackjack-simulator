import { Component, OnInit } from '@angular/core';


import { Card } from '../card';
import { DECK } from '../deck';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrls: ['./in-game.component.css']
})
export class InGameComponent implements OnInit {

  deck = DECK;

  dealerCards: Card[] = [];
  playerCards: Card[] = [];

  dealerMessage = '';
  playerMessage = '';

  constructor() { }

  ngOnInit(): void {
    this.play();
  }

  // deal one card
  deal(): Card {
    let index = Math.floor(Math.random()*this.deck.length);
    return this.deck.splice(index, 1)[0];
  }

  setUp(): void {
    // deal first three cards

    // first player card
    this.playerCards.push(this.deal());

    // first dealer card
    this.dealerCards.push(this.deal());

    // second player card
    this.playerCards.push(this.deal());
  }

  calculateValue(cards: Card[]): number {
    let value = 0;
    let numAce = 0;
    for (let card of cards) {
      value += card.value;
      if (card.value === 1) numAce++;
    }
    if (value < 12 && numAce > 0) value += 10;

    return value;
  }

  end(): void {

  }

  play(): void {
    this.setUp();
    // calculate player hand
    let playerValue = this.calculateValue(this.playerCards);
    if (playerValue === 21) {
      this.playerMessage = 'You got blakcjack!';
      this.end();
    }
    else {
      this.playerMessage = `You have ${playerValue}`;
      // deal the second card for dealer

    }
  }
}
