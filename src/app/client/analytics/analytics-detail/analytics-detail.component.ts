import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector   : 'app-analytics-detail',
    templateUrl: './analytics-detail.component.html',
    styleUrls  : ['./analytics-detail.component.scss']
})
export class AnalyticsDetailComponent implements OnInit, OnDestroy
{   
    

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
    )
    {
        // Set the private defaults
        this.campaignData = {};
        this._unsubscribeAll = new Subject();
        this._activatedRoute.params.subscribe(params => {            
            if (params['campaignid']) {
                this.campaignId = params['campaignid'];
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
   

    // -----------------------------------------------------------------------------------------------------
   
}
