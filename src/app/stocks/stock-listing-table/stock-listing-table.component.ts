import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core/data-table';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'stock-listing-table',
  templateUrl: './stock-listing-table.component.html',
  styleUrls: ['./stock-listing-table.component.scss']
})
export class StockListingTableComponent implements OnInit, OnChanges {
  @Input() tableData = [];
  columns = [
    { name: 'companyName',  label: 'Company' , type: 'text' },
    { name: 'symbol', label: 'Symbol', type: 'url' },
    { name: 'latestPrice', label: 'Price', type: 'number'},
    { name: 'changePercent', label: 'Percent Change' , type: 'percent'}
  ];
  
  gridData = [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
      for(let chng in changes){
        this.gridData = changes[chng].currentValue;
      }
  }

  openStockInfo(columnDef, rowValue){
      this.router.navigate(['/stock', rowValue.symbol.toLowerCase()]);
  }

}
