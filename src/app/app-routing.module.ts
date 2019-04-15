import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockHomeComponent } from './stocks/stock-home/stock-home.component';
import { StocksDetailComponent } from './stocks/stocks-detail/stocks-detail.component';
import { AddAnalysisComponent } from './stocks/add-analysis/add-analysis.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: StockHomeComponent 
  },
  {
    path: 'stock/addAnalysis',
    component: AddAnalysisComponent
  },
  {
    path: 'stock/:stockid',
    component: StocksDetailComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
