import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiTokenService } from 'app/services/token.service';
import * as Constants from 'app/app.const';
import { MatSnackBar } from '@angular/material';
import { ApiAuthService } from 'app/services/auth.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

@Injectable()
export class AnalyticsService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    onApiCall: Subject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */

    constructor(
        private _httpClient: HttpClient,
        private _token: ApiTokenService,
        private _auth: ApiAuthService,
        private _matSnackBar: MatSnackBar,
        private _fuseSplashScreenService: FuseSplashScreenService,

    ) {
        this.onApiCall = new Subject();
        this.onApiCall.subscribe(res => {

            if (res == "calling")
                this._fuseSplashScreenService.show()
            else
                this._fuseSplashScreenService.hide()
        });
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
        this.onApiCall.next("calling");
        return new Promise((resolve, reject) => {
            this._httpClient.get(Constants.API_URL + '/api/getConnectorCampaignList', { headers: this.jwt() })
                .subscribe((response: any) => {
                    this.onApiCall.next("done");
                    resolve(response['items']);
                },
                    error => {
                        this.onApiCall.next("done");
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
        params = params.set('enableBurningHot', '0');
        params = params.set('enableHeatingUp', '0');
        params = params.set('enableConverted', '0');
        this.onApiCall.next("calling");
        return new Promise((resolve, reject) => {

            this._httpClient.get(Constants.API_URL + '/api/getCampaignAnalyticsData', { params: params, headers: this.jwt() })
                .subscribe((response: any) => {
                    this.onApiCall.next("done");
                    resolve(response['data']);
                },
                    error => {
                        this.onApiCall.next("done");
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                    });
        }
        );
    }





}