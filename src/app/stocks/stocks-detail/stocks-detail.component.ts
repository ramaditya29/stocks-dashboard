import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
  stockQuote: any;
  stockCategoryTiles;
  stockNews: any = [];
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
  tiles = [
    {header: 'One', cols: 2, rows: 1, value: ''},
    {header: 'Two', cols: 2, rows: 1, value: ''},
    {header: 'Three', cols: 2, rows: 1, value: ''},
    {header: 'Four', cols: 2, rows: 1, value: ''},
  ];
  similarStocksInfo: any[];
  similarStocks : string[] = ['fb', 'aapl', 'goog', 'amzn', 'bac', 'nflx', 'lyft'];
  constructor(private http:HttpClient, private router: ActivatedRoute, private stockService: StocksService) { }

  ngOnInit() {
     this.router.params.subscribe(params => {
       this.stockSymbol = params['stockid'];
       console.log('the stock symbol is:' , this.stockSymbol); 
       
       this.stockInfo.stockSymbol = params['stockid']; 
       this.getStockQuote(this.stockSymbol);
       this.getStockNews(this.stockSymbol);
       this.getChartData(this.stockSymbol);
       this.getCompanyInfo(this.stockSymbol);
       this.getSimilarStockQuotes(this.stockSymbol);
     })
     
  }

  getStockQuote(stockSymbol: string){
    let url = `/stock/${stockSymbol}/batch`;
    let queryParams = "&types=quote&range=1m&last=20";
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
        console.log("The response is:" , res);
        this.stockQuote = res.quote;
        let {companyName, latestPrice, latestTime, change, changePercent } = res.quote;
        this.stockInfo.companyName = companyName;
        this.stockInfo.latestPrice = latestPrice;
        this.stockInfo.latestTime = latestTime;
        this.stockInfo.change = change;
        this.stockInfo.changePer = changePercent;
        console.log(this.stockInfo);
      }, 
      err => {
        console.log("Error in loading the data");
      })

  }

  getSimilarStockQuotes(stockSymbol){
    let similarStocks = this.similarStocks;
    similarStocks.splice( 0, similarStocks.indexOf(this.stockSymbol) + 1);
    console.log("The similar stocks list: " , similarStocks.join(","));
    //https://cloud.iexapis.com/beta/stock/market/batch?symbols=aapl,fb&types=quote&token=pk_f4c21a8f6ff14f00bd3230bb3ec066a3
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
        console.log("The similarStcks array is:" , similarStcks);
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
        console.log("The response is:" , res);
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
        console.log("The response is:" , res);
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
          console.log("The company info response is:" , res);
          this.companyInfo = res;
          
          this.stockCategoryTiles = res.tags;
      }, 
      err => {
        console.log("Error in loading the data");
      })
  }

}
