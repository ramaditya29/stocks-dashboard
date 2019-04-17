import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit,OnChanges {
  @Input() chartConfig ;
  config = {};
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    for(let change in changes){
      this.config = changes[change].currentValue;
    }
  }

}
