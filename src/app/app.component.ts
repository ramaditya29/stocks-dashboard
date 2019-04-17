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
    //Initially adding feeds to the Feeds section for home page
    if(window.sessionStorage.getItem('watchList') == null){
      dataservice.loadWatchListItems();
    }
    //Initially loading some entries into Watch list section
    if(window.sessionStorage.getItem('posts') == null){
      dataservice.loadNewsFeedItems();
    }
    //Getting stock values from the data service
    this.autoCompleteStockItems = this.dataservice.getAutoCompleteItems();
    //Adding Observable to top search bar
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
  
  //Event that triggers when we select an item from the Auto Complete list
  openStockDetailsPage(symbol: string){
    this.router.navigate(['/stock', symbol.toLowerCase()]);
  }
}
