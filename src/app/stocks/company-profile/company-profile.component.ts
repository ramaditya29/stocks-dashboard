import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit, OnChanges {
  @Input() profile;
  profileData = {};
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    for(let chng in changes){
      this.profileData = changes[chng].currentValue;
    }
  }
}
