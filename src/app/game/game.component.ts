import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  betPlaced = false;

  bet?: number;

  constructor() { }

  ngOnInit(): void {
  }

  onBetPlaced(bet: number) {
    this.betPlaced = true;
    this.bet = bet;
  }

}
