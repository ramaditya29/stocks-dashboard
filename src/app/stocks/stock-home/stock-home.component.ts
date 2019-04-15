import { Component, OnInit } from '@angular/core';
import { StocksService } from '../stocks.service';
import { TouchSequence } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { CovalentHighlightModule } from '@covalent/highlight';

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
  sectorsInfo:Object[] = [];
  constructor(private stockService: StocksService, private router: Router) { }
  
  ngOnInit() {
    this.getMarketCharts();
    this.getMarketGainers();
    this.getMarketLosers();
    this.getSectorsInfo();
  }


  getMarketCharts(){
    let url = '/stock/market/batch';
    let queryParams = `&symbols=${this.markets.join(",")}&types=quote,chart&range=1m&last=5`;
    this.stockService.handleGet(url, queryParams)
      .subscribe(res => {
         console.log("The resp is:" , res);
         let marketsData = [];
         let temp = [];
         for(let item in this.markets){
           let {quote, chart} = res[this.markets[item]];
           let charts = this.stockService.buildChartData( chart,  quote.symbol);
           console.log("the charts is:" , charts);
           marketsData.push({quote, charts});
            temp.push({charts});
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


  buildChartData(data, symbol): object{
    console.log("Entered");
    let config = {
      "xAxis": [
        {
          "show": true,
          "type": "time",
          "boundaryGap": false
        }
      ],
      "yAxis": [
        {
          "show": false,
          "type": "value",
          "axisLabel": {
            "inside": true
          }
        }
      ],
      "series": [
        {
          "name": "",
          "type": "line",
          "itemStyle": {
            "opacity": 0.95,
            "color": "#007373"
          },
          "data": []
        }
      ],
      "tooltip": {
        "show": true,
        "trigger": "axis",
        "showContent": true
      }
    };
    config.series[0].name = symbol;
    let seriesData = [];
    for(let idx in data){
      seriesData.push({
        name: data[idx].date,
        value: [new Date(data[idx].date), data[idx].close]
      })
    }
    config.series[0].data = seriesData;
   
    return config;
  }

  getSectorsInfo(){
    let url = `/stock/market/sector-performance`;
    this.stockService.handleGet(url, '')
      .subscribe(res => {
        console.log("The response is:" , res);
        this.sectorsInfo = this.sectorsInfo.concat(res);
      }, err => {
        console.log("The error is:" , err);
      })
  }

  addNewPost(){
    this.router.navigate(['/stock/addAnalysis']);
  }
}
