import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, OnChanges {
  @Input() profile;
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
    for(let chng in changes){
      this.profile = changes[chng];
    }
  }
}
