import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit, OnChanges {
  @Input() companySummary;
  companyData: any = {};
  
  constructor() { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
    for(let change in changes){
      console.log(changes[change]);
      this.companyData = changes[change].currentValue;
    }
  }

  open(url){
    window.location.href = url;
  }
}
