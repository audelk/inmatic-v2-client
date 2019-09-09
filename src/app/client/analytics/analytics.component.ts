import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { AnalyticsService } from './analytics.service';

@Component({
    selector     : 'app-analytics',
    templateUrl  : './analytics.component.html',
    styleUrls    : ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AnalyticsComponent implements OnInit, OnDestroy
{
    campaignList: any[];

    // Private
    private _unsubscribeAll: Subject<any>;

   
    constructor(
        private  _router: Router,
        private _analyticsService: AnalyticsService        
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._analyticsService.getConnectorCampaignList().then(res => {
            this.campaignList = res;
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
