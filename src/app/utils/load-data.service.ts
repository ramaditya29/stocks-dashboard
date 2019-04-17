import { Injectable } from '@angular/core';
import { StockItem } from './models/StockItem';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  constructor() { }

  getAutoCompleteItems() : StockItem[]{
    return [
      {companyName: 'Apple Inc.', stockSymbol: 'AAPL'},
      {companyName: 'Facebook Inc.', stockSymbol: 'FB'},
      {companyName: 'Bank Of America', stockSymbol: 'BAC'},
      {companyName: 'Netflix', stockSymbol: 'NFLX'},
      {companyName: 'Tesla Inc.', stockSymbol: 'TSLA'},
      {companyName: 'Microsoft Inc.', stockSymbol: 'MSFT'},
      {companyName: 'Amazon Inc.', stockSymbol: 'AMZN'},
      {companyName: 'Google-Alphabet', stockSymbol: 'GOOG'},
      {companyName: 'Wells Fargo', stockSymbol: 'WFC'},
      {companyName: 'JP Morgan Chase', stockSymbol: 'JPM'},
      {companyName: 'NVIDIA', stockSymbol: 'NVDA'},
      {companyName: 'Twitter Inc', stockSymbol: 'TWTR'},
      {companyName: 'Dropbox', stockSymbol: 'DBX'},
      {companyName: 'Starbucks', stockSymbol: 'SBUX'},
      {companyName: 'Walmart', stockSymbol: 'WMT'},
      {companyName: 'Alibaba', stockSymbol: 'BABA'}
    ];
  }
  
  loadWatchListItems(){
    window.sessionStorage.setItem('watchList', JSON.stringify(['amzn', 'aapl']));
  }

  loadNewsFeedItems(){
    window.sessionStorage.setItem('posts', JSON.stringify([{
      "title":"S&P 500 climbs to near record high as earnings season shifts to high gear",
      "subtitle":"",
      "imageurl":"https://static-news.moneycontrol.com/static-mcnews/2017/03/wall-street-2-770x433.jpg",
      "source":"Money Control",
      "postedDate":"2019-04-15T03:36:25.951Z",
      "ref":"https://www.moneycontrol.com/news/business/markets/sp-500-climbs-to-near-record-high-as-earnings-season-shifts-to-high-gear-3819721.html?utm_campaign=cityfalcon&utm_medium=cityfalcon&utm_source=cityfalcon",
      "description":"US stocks climbed back to near record highs on Friday after the largest US bank, JPMorgan Chase & Co, soothed worries that the first-quarter earnings season would pour cold water on Wall Street's big rally back from last year's slump.\n\nThe S&P 500 has come within a percent of September's record closing high, regaining ground lost after a punishing sell-off in the closing months of the year which brought the benchmark index within a rounding error of bear market territory.\n\nSince then, the three major indexes notched their best quarterly gains in nearly a decade in the first quarter, but have been in a holding pattern in April ahead of first-quarter earnings season.\n\nJPMorgan, effectively kicking off the quarterly earnings reporting season that will dominate Wall Street's agenda for the coming weeks, breezed past analyst estimates, easing fears that slowing economic growth could weigh on its results. Its stock rose 4.5% and led a broad rally in bank stocks.",
      "author":"Aditya"
    }]))
  }
}
