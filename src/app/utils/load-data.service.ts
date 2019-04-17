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

  
}
