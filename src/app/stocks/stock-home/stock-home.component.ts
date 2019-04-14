import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss']
})
export class StockHomeComponent implements OnInit {

  markets = ['SPY', 'DIA', 'NDAQ'];

  marketsQuotesChartData: any[] = [];
  marketLosers: any[] = [];
  marketGainers: any[] = [];

  constructor(private stockService: StocksService, private router: Router) { }
  
  ngOnInit() {
    this.getMarketCharts();
    this.getMarketGainers();
    this.getMarketLosers();
  }


  getMarketCharts(){
    let url = '/stock/market/batch';
    let queryParams = `&symbols=${this.markets.join(",")}&types=quote,chart&range=1m&last=5`;
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
         console.log("The resp is:" , res);
         let marketsData = [];
         for(let item in this.markets){
           let {quote, chart} = res[this.markets[item]];
           marketsData.push({quote, chart});
         }
         console.log("The final data is:" , marketsData);
         this.marketsQuotesChartData = marketsData;
      }, err => {
        console.log("Error occured");
      })
  }

  getMarketGainers(){
    let url = 'https://api.iextrading.com/1.0/stock/market/list/gainers';
    this.stockService.handleGet(url, '', true)
      .subscribe(res => {
        console.log("The res is:" , res);
        this.marketGainers = this.stockService.parseMultiStockJSON(res);
      }, err => {
        console.log("Error occured");
      })
  }

  getMarketLosers(){
    let url = 'https://api.iextrading.com/1.0/stock/market/list/losers';
    this.stockService.handleGet(url, '', true)
      .subscribe(res => {
        console.log("The res is:" , res);
        this.marketLosers = this.stockService.parseMultiStockJSON(res);
      }, err => {
        console.log("Error occured");
      })
  }

  openStockDetailView(stockSymbol){
    this.router.navigate(['/stock', stockSymbol.toLowerCase()]);
  }
}
