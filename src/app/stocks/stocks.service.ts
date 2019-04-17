import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StocksService {
  apiUrl: string = 'https://cloud.iexapis.com/beta';
  token: string = 'pk_f4c21a8f6ff14f00bd3230bb3ec066a3';
  constructor(private http: HttpClient) { }



  handleGet(url: string, queryParams?: string, ignoreUrl?: boolean){
    let newUrl = '';
    if(ignoreUrl)
      newUrl = `${url}`;
    else   
      newUrl = `${this.apiUrl}${url}?token=${this.token}${queryParams}`;
    return this.http.get(newUrl);
  }

  handlePost(){

  }


  parseMultiStockJSON(data){
    let stocks = Object.keys(data);
    let similarStcks = [];
    for(let item in stocks){
      let {companyName, symbol, latestPrice, changePercent} = data[stocks[item]];
      similarStcks.push({companyName, symbol, latestPrice, changePercent});
    }
    return similarStcks;
  }


  buildChartData(data, symbol): object{
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
    config.series[0].name = symbol.toUpperCase();
    let seriesData = [];
    for(let idx in data){
      let ndate = data[idx].date.split("-").join("/");
      seriesData.push({
        name: data[idx].date,
        value: [new Date(ndate), data[idx].close]
      })
    }
    config.series[0].data = seriesData;
   
    return config;
  }
}
