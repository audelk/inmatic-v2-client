import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {FuseUtils} from '@fuse/utils';
import {User} from 'app/models/user';
import {map} from 'rxjs/operators';
import {ApiTokenService} from 'app/services/token.service';
import * as Constants from 'app/app.const';
import {MatSnackBar} from '@angular/material';
import {ApiAuthService} from 'app/services/auth.service';

@Injectable()
export class AnalyticsService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */

    constructor(
        private _httpClient: HttpClient,
        private _token: ApiTokenService,
        private _auth: ApiAuthService,
        private _matSnackBar: MatSnackBar
    ) {

    }

    private jwt(): any {
        const tokenStr = this._token.get();
        if (tokenStr) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenStr);
            return headers;
        } else {
            return '';
        }
    }

    /**
     * Get email templates
     *
     * 
     * @returns {Promise<any>}
     */ 
    getConnectorCampaignList(): Promise<any> {    
               
        return new Promise((resolve, reject) => {
                this._httpClient.get(Constants.API_URL + '/api/getConnectorCampaignListForAnalytics', { headers: this.jwt()})
                    .subscribe((response: any) => {
                        resolve(response['list']);
                    },
                    error => {
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                    });
            }
        );
    }
    
    getCampaignAnalyticsData(campaign_id): Promise<any> {
        let params = new HttpParams();    
        params = params.set('campaign_id', campaign_id);
        return new Promise((resolve, reject) => {
                this._httpClient.get(Constants.API_URL + '/api/getCampaignAnalyticsData', { params:params,headers: this.jwt()})
                    .subscribe((response: any) => {
                        resolve(response['data']);
                    },
                    error => {
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                    });
            }
        );
    }  
    
   
      
    

}
