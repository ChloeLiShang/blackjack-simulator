import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bet-place',
  templateUrl: './bet-place.component.html',
  styleUrls: ['./bet-place.component.css']
})
export class BetPlaceComponent implements OnInit {

  MAX_BET = 50;
  MIN_BET = 1;

  bet = this.MIN_BET;

  @Output() placeBet = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onMax() {
    this.bet = this.MAX_BET;
  }

  onConfirm() {
    this.placeBet.emit(this.bet);
  }

  minusOne() {
    this.bet -= 1;
  }

  minusTen() {
    this.bet -= 10;
  }

  plusOne() {
    this.bet += 1;
  }

  plusTen() {
    this.bet += 10;
  }

}
