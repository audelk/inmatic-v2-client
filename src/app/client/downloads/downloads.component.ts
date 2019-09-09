import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DownloadsService } from './downloads.service';
import { fuseAnimations } from '@fuse/animations';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DatePipe } from '@angular/common';

@Component({
    selector     : 'app-downloads',
    templateUrl  : './downloads.component.html',
    styleUrls    : ['./downloads.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class DownloadsComponent implements OnInit, OnDestroy
{
    connectorCampaigns: any[];
    isLoading = false;

    // Private
    private _unsubscribeAll: Subject<any>;

   
    constructor(
        private  _router: Router,
        private _downloadsService: DownloadsService,
        private _datePipe: DatePipe        
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._downloadsService.getConnectorCampaignList().then(res => {
            this.connectorCampaigns = res;
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

    download(connector_campaign_id){
        this.isLoading = true;
        let that=this;
        this._downloadsService.getContactsJSON(connector_campaign_id).then((res:any) => {
            that.isLoading = false;
            var json = [];
            for(var i in res){
                var one = res[i];
                json.push({
                    email: one.email,
                    phone:one.phone,
                    firstName: one.firstName,
                    lastName:one.lastName,
                    title:one.title,
                    location:one.location,
                    date: that._datePipe.transform(new Date(one.cdate*1), 'yyyy-MM-dd')
                });
            }
            that.downloadAsFile(json);
        }).catch(err => {
            that.isLoading = false;
        });        
    }
    downloadAsFile(json){       
        var options = {            
           
            headers: ['Email',"Phone",'First Name', 'Last Name', 'Title', 'Location','Date Connected']
          };
          new ngxCsv(json, 'contacts',options);
    }

    // -----------------------------------------------------------------------------------------------------
  
}
