import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentBarEchartsModule } from '@covalent/echarts/bar';
import { CovalentLineEchartsModule } from '@covalent/echarts/line';
import { CovalentTooltipEchartsModule } from '@covalent/echarts/tooltip';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    CovalentBaseEchartsModule,
    CovalentBarEchartsModule,
    CovalentLineEchartsModule,
    CovalentTooltipEchartsModule,
  ],
  exports: [ChartComponent]
})
export class UtilsModule { }
