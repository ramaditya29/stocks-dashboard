import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit, OnChanges {
  @Input() companySummary;
  tiles = [
    {header: 'Exchange', cols: 2, rows: 1, value: 'exchange', type: 'text'},
    {header: 'CEO' , cols: 2, rows: 1, value: 'CEO', type: 'text'},
    {header: 'Number of Employees', cols: 2, rows: 1, value: 'employees', type: 'number'},
    {header: 'Sector', cols: 2, rows: 1, value: 'sector', type: 'text'},
    {header: 'Industry', cols: 2, rows: 1, value: 'industry', type: 'text'},
    {header: 'Website', cols:2, rows: 1, value: 'website' , type: 'url'}
  ];
  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    for(let change in changes){
      console.log(changes[change]);
      this.companySummary = changes[change].currentValue;
    }
  }
}
