import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalyticsService } from '../analytics.service';
import { StockChart } from 'angular-highcharts';

@Component({
    selector   : 'app-analytics-detail',
    templateUrl: './analytics-detail.component.html',
    styleUrls  : ['./analytics-detail.component.scss']
})
export class AnalyticsDetailComponent implements OnInit, OnDestroy
{   
    
    stockChart:StockChart;
    campaignData:any;
    campaignId:any;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _analyticsSevice: AnalyticsService
    )
    {
        // Set the private defaults
        this.campaignData = {};
        this._unsubscribeAll = new Subject();
        this._activatedRoute.params.subscribe(params => {            
            if (params['campaignid']) {
                this.campaignId = params['campaignid'];
                this._analyticsSevice.getCampaignAnalyticsData(this.campaignId).then(res => {
                    this.campaignData = res;
                    this.stockChart = new StockChart(this.createChartOptions(this.campaignData.chartData));
                    console.log(this.campaignData);
                });
                console.log(this.campaignId);                       
            }            
        });             
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
               
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    createChartOptions(seriesOptions):any {
        return {           
            navigator: {
                enabled:false
            },
            legend: {
                enabled:true
            },
            rangeSelector: {
                selected:4
            },
            yAxis: {
                labels: {

                },
                plotLines:[{
                    value: 0,
                    width:2,
                    color: 'silver'
                }]
            },
            plotOptions: {
                series: {
                    showInNavigator:true
                }
            },
            tooltip: {
                xDateFormat: '%Y-%m-%d',
                pointFormat: '<span style = "color:{series.color}">{series.name} </span> : <b>{point.y}</b> <br/>',
                valueDecimals: 0
            },
            series:seriesOptions
        }
    }
   

    // -----------------------------------------------------------------------------------------------------
   
}
