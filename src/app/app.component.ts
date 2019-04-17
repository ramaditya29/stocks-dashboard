import { Component } from '@angular/core';
import { StockItem } from './utils/models/StockItem';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadDataService } from './utils/load-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stockCtrl = new FormControl();
  showSearchBar : boolean = false;
  filteredStocks: Observable<StockItem[]>;
  autoCompleteStockItems: StockItem[] = [];

  constructor(private router: Router, private dataservice: LoadDataService) {
    if(window.sessionStorage.getItem('watchList')){
      dataservice.loadWatchListItems();
    }

    if(window.sessionStorage.getItem('posts')){
      dataservice.loadNewsFeedItems();
    }
    this.autoCompleteStockItems = this.dataservice.getAutoCompleteItems();
    this.filteredStocks = this.stockCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStocks(state) : this.autoCompleteStockItems.slice())
      );
  }

  private _filterStocks(value: string): StockItem[] {
    const filterValue = value.toLowerCase();
    console.log("Entered" , value);
    return this.autoCompleteStockItems.filter(stock => stock.companyName.toLowerCase().indexOf(filterValue) === 0);
  }
  

  openStockDetailsPage(symbol: string){
    this.router.navigate(['/stock', symbol.toLowerCase()]);
  }
}
