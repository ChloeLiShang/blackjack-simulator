import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { PointsService } from '../points.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  betPlaced = false;

  bet: number = 0;

  playerPoints: number = 0;

  constructor(private pointsService: PointsService) { }

  ngOnInit(): void {
    this.getPoints();
  }

  onBetPlaced(bet: number) {
    this.betPlaced = true;
    this.bet = bet;
    this.pointsService.getPoints()
      .subscribe(points => this.playerPoints = points - this.bet);
    this.pointsService.updatePoints(this.playerPoints);
  }

  onUpdate(pointsEarned: number) {
    this.playerPoints += pointsEarned;
    this.pointsService.updatePoints(this.playerPoints);
    // start a new round
    this.betPlaced = false;
    this.bet = 0;
  }

  getPoints(): void {
    this.pointsService.getPoints()
      .subscribe(points => this.playerPoints = points);
  }

}
