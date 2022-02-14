import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-bet-place',
  templateUrl: './bet-place.component.html',
  styleUrls: ['./bet-place.component.css']
})
export class BetPlaceComponent implements OnInit {

  MAX_BET = 50;
  MIN_BET = 1;

  bet = 0;


  @Output() placeBet = new EventEmitter();

  constructor(public pointsService: PointsService) { }

  ngOnInit(): void {
  }

  onMax() {
    this.bet = Math.min(this.MAX_BET, this.pointsService.playerPoints);
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
