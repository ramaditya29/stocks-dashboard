import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { CovalentHighlightModule } from '@covalent/highlight';

@Component({
  selector: 'stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.scss']
})
export class StockHomeComponent implements OnInit {

  markets = ['SPY', 'DIA', 'NDAQ'];
  newsFeeds: any[] = [];
  marketsQuotesChartData: any[] = [];
  marketLosers: any[] = [];
  marketGainers: any[] = [];
  sectorsInfo:Object[] = [];
  watchListEntries : any[] = [];
  constructor(private stockService: StocksService, private router: Router) { }
  
  ngOnInit() {
    this.getNewsFeeds();
    this.getWatchListEntries();
    this.getMarketCharts();
    this.getMarketGainers();
    this.getMarketLosers();
    this.getSectorsInfo();
  }

  getNewsFeeds(){
    let feeds = window.sessionStorage.getItem('posts') ? JSON.parse(window.sessionStorage.getItem('posts')) : [];
    this.newsFeeds = feeds;
  }

  getWatchListEntries(){
    let watchList = window.sessionStorage.getItem('watchList') ? JSON.parse(window.sessionStorage.getItem('watchList')) : [];
    if(watchList.length > 0){
      let url = '/stock/market/batch';
    let queryParams = `&symbols=${watchList.join(",")}&types=quote`;
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
        let stocks = Object.keys(res);
        let temp = [];
        for(let item in stocks){
          let {companyName, symbol, latestPrice, changePercent} = res[stocks[item]].quote;
          temp.push({companyName, symbol, latestPrice, changePercent});
        }
        this.watchListEntries = temp;
      }, err => {
        console.log("Error occured");
      })
    }
  }

  getMarketCharts(){
    let url = '/stock/market/batch';
    let queryParams = `&symbols=${this.markets.join(",")}&types=quote,chart&range=1m&last=5`;
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
         let marketsData = [];
         let temp = [];
         for(let item in this.markets){
           let {quote, chart} = res[this.markets[item]];
           let charts = this.stockService.buildChartData( chart,  quote.symbol);
           marketsData.push({quote, charts});
            temp.push({charts});
         }
         this.marketsQuotesChartData = marketsData;
         
      }, err => {
        console.log("Error occured");
      })
  }

  getMarketGainers(){
    let url = 'https://api.iextrading.com/1.0/stock/market/list/gainers';
    this.stockService.handleGet(url, '', true)
      .subscribe(res => {
        this.marketGainers = this.stockService.parseMultiStockJSON(res);
      }, err => {
        console.log("Error occured");
      })
  }

  getMarketLosers(){
    let url = 'https://api.iextrading.com/1.0/stock/market/list/losers';
    this.stockService.handleGet(url, '', true)
      .subscribe(res => {
        this.marketLosers = this.stockService.parseMultiStockJSON(res);
      }, err => {
        console.log("Error occured");
      })
  }

  openStockDetailView(stockSymbol){
    this.router.navigate(['/stock', stockSymbol.toLowerCase()]);
  }

  getSectorsInfo(){
    let url = `/stock/market/sector-performance`;
    this.stockService.handleGet(url, '')
      .subscribe(res => {
        this.sectorsInfo = this.sectorsInfo.concat(res);
      }, err => {
        console.log("The error is:" , err);
      })
  }

  addNewPost(){
    this.router.navigate(['/stock/addAnalysis']);
  }

  openNewsFeed(url){
    window.location.href = url;
  }
}
