import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatProgressBarModule, MatRippleModule, MatSidenavModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { ChartModule,HIGHCHARTS_MODULES  } from 'angular-highcharts';
import * as highstock from 'highcharts/modules/stock.src';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseMaterialColorPickerModule } from '@fuse/components';
import { AnalyticsComponent } from 'app/client/analytics/analytics.component';
import { AnalyticsDetailComponent } from  'app/client/analytics/analytics-detail/analytics-detail.component';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AnalyticsService } from './analytics.service';
const routes: Routes = [
    {
        path     : '',
        component: AnalyticsComponent,
    },
    {
        path     : ':campaignid/detail',
        component: AnalyticsDetailComponent,
    }
    
];

@NgModule({
    declarations   : [
       AnalyticsComponent,
       AnalyticsDetailComponent
    ],
    imports        : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        ChartsModule,
        NgxChartsModule,
        ChartModule,       


        NgxDnDModule,

        FuseSharedModule,
        FuseConfirmDialogModule,
        FuseMaterialColorPickerModule
    ],
    providers      : [
        { 
            provide: HIGHCHARTS_MODULES, 
            useFactory: () => [ highstock,more,exporting ] 
        },        
        AnalyticsService
    ],   
})
export class AnalyticsModule
{
}
