import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockHomeComponent } from './stocks/stock-home/stock-home.component';
import { StocksDetailComponent } from './stocks/stocks-detail/stocks-detail.component';
import { AddAnalysisComponent } from './stocks/add-analysis/add-analysis.component';
import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
