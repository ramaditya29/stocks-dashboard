import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StocksDetailComponent } from './stocks-detail/stocks-detail.component';
import { StockHomeComponent } from './stock-home/stock-home.component';
import { RouterModule} from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CovalentCommonModule } from '@covalent/core/common';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentMediaModule } from '@covalent/core/media';
import { CovalentLoadingModule } from '@covalent/core/loading';
import { CovalentHttpModule, TdHttpService } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentChipsModule } from '@covalent/core/chips';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentBarEchartsModule } from '@covalent/echarts/bar';
import { CovalentLineEchartsModule } from '@covalent/echarts/line';
import { CovalentTooltipEchartsModule } from '@covalent/echarts/tooltip';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { NewsComponent } from './news/news.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { StockListingTableComponent } from './stock-listing-table/stock-listing-table.component';
import { UtilsModule } from '../utils/utils.module';
import { ChartComponent } from '../utils/chart/chart.component';
import { AddAnalysisComponent } from './add-analysis/add-analysis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [StocksDetailComponent, StockHomeComponent, CompanyInfoComponent, NewsComponent, CompanyProfileComponent, StockListingTableComponent, AddAnalysisComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatToolbarModule,
    MatGridListModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    CovalentCommonModule,
    CovalentChipsModule,
    CovalentLayoutModule,
    CovalentMediaModule,
    CovalentLoadingModule,
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentDynamicFormsModule,
    CovalentBaseEchartsModule,
    CovalentBarEchartsModule,
    CovalentLineEchartsModule,
    CovalentTooltipEchartsModule,
    CovalentDataTableModule,
    UtilsModule
  ]
})
export class StocksModule { }
