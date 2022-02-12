import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; 


import { Card } from '../card';
import { DECK } from '../deck';

@Component({
  selector: 'app-in-game',
  templateUrl: './in-game.component.html',
  styleUrls: ['./in-game.component.css']
})
export class InGameComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.play();
  }

  @Input() betPlaced!: number;
  @Input() playerPoints!: number;
  @Output() update = new EventEmitter();

  deck = DECK.slice(); // create a shallow copy

  cardBack: Card = {
    name: 'back',
    value: 0,
    img: 'assets/poker_cards/002.svg'
  }

  hiddenCard?: Card;

  dealerCards: Card[] = [];
  playerCards: Card[] = [];

  dealerValue = 0;
  playerValue = 0;
  pointsEarned = 0; // points player earned in this game


  dealerMessage = '';
  playerMessage = '';
  gameResult = '';

  movesAvailable = false;
  goNext = false;

  playerBlackjack = false;
  dealerBlackjack = false;
  playerBust = false;
  dealerBust = false;


  // deal one card
  async deal(): Promise<Card> {
    await this.sleep(1000);
    let index = Math.floor(Math.random()*this.deck.length);
    return this.deck.splice(index, 1)[0];
  }

  async setUp(): Promise<void> {
    // deal first three cards

    // first player card
    this.playerCards.push(await this.deal());

    // first dealer card
    this.dealerCards.push(await this.deal());

    // second player card
    this.playerCards.push(await this.deal());
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
    // determine game result
    if (this.playerBlackjack) {
      this.gameResult = "Player has blackjack";
      this.pointsEarned = 2.5*this.betPlaced;
    } else if (this.dealerBlackjack) {
      this.gameResult = "Dealer has blackjack";
    } else if (this.playerBust) {
      this.gameResult = "Player has gone bust";
    } else if (this.dealerBust) {
      this.gameResult = "Player wins";
      this.pointsEarned = 2*this.betPlaced;
    } else {
      // compare hands
      if (this.playerValue > this.dealerValue) {
        this.gameResult = "Player wins";
        this.pointsEarned = 2*this.betPlaced;
      } else if (this.playerValue < this.dealerValue) {
        this.gameResult = "Dealer wins";
      } else {
        this.gameResult = "The hand is a push";
        this.pointsEarned = this.betPlaced;
      }
    }
    this.goNext = true;
  }

  async hit(): Promise<void> {
    // deal a card to player
    this.playerCards.push(await this.deal());
    this.playerValue = this.calculateValue(this.playerCards);
    if (this.playerValue === 21) {
      this.movesAvailable = false;
      this.playerMessage = "You have 21";
      await this.sleep(1500);
      this.dealerTurn();
    } else if (this.playerValue > 21) {
      this.playerMessage = "You've gone bust";
      this.movesAvailable = false;
      this.playerBust = true;
      // dealer should continue to deal his card?
      await this.sleep(1800);
      this.dealerTurn();
      this.end();
    } else {
      this.playerMessage = `You have ${this.playerValue}`;
    }
  }

  async stand(): Promise<void> {
    this.movesAvailable = false;
    await this.sleep(1100);
    this.dealerTurn();
  }

  async dealerTurn(): Promise<void> {
    // dealer reveal cards
    if (this.hiddenCard){
      this.dealerCards.splice(1,1, this.hiddenCard);
      this.dealerValue = this.calculateValue(this.dealerCards);
      this.dealerMessage = `Dealer has ${this.dealerValue}`;
      while (this.dealerValue < 17) {
        await this.sleep(500);
        this.dealerCards.push(await this.deal());
        this.dealerValue = this.calculateValue(this.dealerCards);
        if (this.dealerValue > 21) {
          this.dealerMessage = "Dealer has gone bust";
          this.dealerBust = true;
        } else {
          this.dealerMessage = `Dealer has ${this.dealerValue}`;
        }
      }
      // TODO: show game result
      this.end();
    }
  }

  async play(): Promise<void> {
    await this.setUp();
    // calculate player hand
    this.playerValue = this.calculateValue(this.playerCards);
    if (this.playerValue === 21) {
      this.playerMessage = 'You got blakcjack!';
      this.playerBlackjack = true;
      // TODO: END GAME
      this.end();
    }
    else {
      this.playerMessage = `You have ${this.playerValue}`;

      // deal the second card for dealer
      this.hiddenCard = await this.deal();
      this.dealerCards.push(this.cardBack);
      await this.sleep(800);

      // only check for dealer blackjack if shown card has 10 or ACE
      if (this.dealerCards[0].value === 10 || this.dealerCards[0].value === 1) {
        this.dealerMessage = 'Checking for blackjack...';
        await this.sleep(1500);
        // check for dealer blackjack
        this.dealerValue = this.calculateValue(this.dealerCards.concat([this.hiddenCard]));
        if (this.dealerValue === 21) {
          this.dealerMessage = 'Dealer got blackjack';
          this.dealerBlackjack = true;
          // show hidden card
          this.dealerCards.splice(1,1, this.hiddenCard);
          // TODO: END GAME
          this.end();
        } else {
          // let player decide next move
          this.dealerMessage = '';
          this.movesAvailable = true;
        }
      }
      else {
        // let player decide next move
        this.dealerMessage = '';
        this.movesAvailable = true;
      }
    }
  }

  onContinue() {
    this.update.emit(this.pointsEarned);
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}
