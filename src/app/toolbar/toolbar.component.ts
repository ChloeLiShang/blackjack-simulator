import { Component, OnInit } from '@angular/core';
import { PointsService } from '../points.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public pointsService: PointsService) { }

  ngOnInit(): void {
  }

  onReset() {
    this.pointsService.updatePoints(200);
  }

}
