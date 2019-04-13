import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StocksService {
  apiUrl: string = 'https://cloud.iexapis.com/beta';
  token: string = 'pk_f4c21a8f6ff14f00bd3230bb3ec066a3';
  constructor(private http: HttpClient) { }


  makeApiCall(method, url, body? , headers?){
    let newUrl = `${this.apiUrl}${url}?token=${this.token}`;
    switch(method){
      case 'GET': return this.http.get(newUrl).map(res =>  res.json());
                  
      case 'POST': return this.http.post(newUrl, body);
    }              

  }

  handleGet(url: string, queryParams: string){
    let newUrl = `${this.apiUrl}${url}?token=${this.token}${queryParams}`;
    return this.http.get(newUrl);
  }

  handlePost(){

  }
}
