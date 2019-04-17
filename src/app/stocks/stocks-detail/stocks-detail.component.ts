import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StocksService } from '../stocks.service';

@Component({
  selector: 'stocks-detail',
  templateUrl: './stocks-detail.component.html',
  styleUrls: ['./stocks-detail.component.scss']
})
export class StocksDetailComponent implements OnInit {
  stockSymbol : string;
  companyName: string;
  companyInfo: any;
  stockQuote: any[];
  stockCategoryTiles;
  stockNews: any[] = [];
  stockChartConfig = {};
  stockInfo: { stockSymbol: string, companyName: string, latestPrice: any , change: any, changePer: any, latestTime: string , companyDescription: string} = {
    stockSymbol: '',
    companyName: '',
    latestPrice: 0,
    change: 0,
    changePer: 0,
    latestTime: '',
    companyDescription: ''
  };
  watchListFlag: boolean = false;
  similarStocksInfo: any[];
  similarStocks : string[] = ['fb', 'aapl', 'goog', 'amzn', 'bac', 'nflx', 'lyft'];
  watchListSymbols = [];
  constructor(private http:HttpClient, private router: ActivatedRoute, private stockService: StocksService, private route : Router) { }

  ngOnInit() {
     this.watchListSymbols = window.sessionStorage.getItem('watchList') ? JSON.parse(window.sessionStorage.getItem('watchList')) : [];
     this.router.params.subscribe(params => {
       this.stockSymbol = params['stockid'];
       if(this.watchListSymbols.indexOf(this.stockSymbol.toLowerCase()) > -1){
          this.watchListFlag = true;
       }
       this.stockInfo.stockSymbol = params['stockid']; 
       this.getStockQuote(this.stockSymbol);
       
     })
     
  }

  getStockQuote(stockSymbol: string){
    let url = `/stock/${stockSymbol}/batch`;
    let queryParams = "&types=quote&range=1m&last=20";
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
        this.stockQuote = res.quote;
        let {companyName, latestPrice, latestTime, change, changePercent } = res.quote;
        this.stockInfo.companyName = companyName;
        this.stockInfo.latestPrice = latestPrice;
        this.stockInfo.latestTime = latestTime;
        this.stockInfo.change = change;
        this.stockInfo.changePer = changePercent;
       
        this.getStockNews(this.stockSymbol);
        this.getChartData(this.stockSymbol);
        this.getCompanyInfo(this.stockSymbol);
        this.getSimilarStockQuotes(this.stockSymbol);
      }, 
      err => {
        console.log("Error in loading the data");
        this.route.navigate(['/error' , {message: 'Cannot find Stock Symbol'}]);
      })

  }

  getSimilarStockQuotes(stockSymbol){
    let similarStocks = this.similarStocks;
    similarStocks.splice( 0, similarStocks.indexOf(this.stockSymbol) + 1);
    let url = '/stock/market/batch';
    let queryParams = `&symbols=${similarStocks.join(",")}&types=quote`;
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
        let stocks = Object.keys(res);
        let similarStcks = [];
        for(let item in stocks){
          let {companyName, symbol, latestPrice, changePercent} = res[stocks[item]].quote;
          similarStcks.push({companyName, symbol, latestPrice, changePercent});
        }
        this.similarStocksInfo = similarStcks;
      }, err => {
        console.log("Error occured");
      })
  }

  getStockNews(stockSymbol: string){
    let url = `/stock/${stockSymbol}/batch`;
    let queryParams = "&types=news&range=1m&last=5";
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
        this.stockNews = res.news;
      }, 
      err => {
        console.log("Error in loading the data");
      })

  }

  getChartData(stockSymbol: string){
    let url = `/stock/${stockSymbol}/batch`;
    let queryParams = "&types=chart&range=1m&last=20";
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
        let chartConfig = this.stockService.buildChartData( res.chart,  this.stockSymbol);
        this.stockChartConfig = chartConfig;
        console.log(this.stockChartConfig);
      }, 
      err => {
        console.log("Error in loading the data");
      })

  }

  getCompanyInfo(stockSymbol){
    let url = `/stock/${stockSymbol}/company`;
    this.stockService.handleGet(url, '')
      .subscribe(res => {
          this.companyInfo = res;
          this.stockCategoryTiles = res.tags;
      }, 
      err => {
        console.log("Error in loading the data");
      })
  }

  toggleWatchList(symbol, operation){
      let watchListItems = window.sessionStorage.getItem('watchList') ? JSON.parse(window.sessionStorage.getItem('watchList')) : [];
      symbol = symbol.toLowerCase();
     if(operation === 'add'){
       this.watchListFlag = true;
       watchListItems.push(symbol);
     } else {
       this.watchListFlag = false;
       watchListItems.splice(0, watchListItems.indexOf(symbol) + 1);
       
     }
     window.sessionStorage.setItem('watchList', JSON.stringify(watchListItems));
  }
}
