import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  playerPoints = 200;

  constructor() { }

  getPoints(): Observable<number> {
    const points = of(this.playerPoints);
    return points;
  }

  deductPoints(points: number): void {
    this.playerPoints -= points;
  }

  addPoints(points: number): void {
    this.playerPoints += points;
  }

  updatePoints(points: number): void {
    this.playerPoints = points;
  }
}
