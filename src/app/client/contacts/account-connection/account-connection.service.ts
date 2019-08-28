import { Injectable,OnInit } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';

import {ApiTokenService} from 'app/services/token.service';

import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as Constants from 'app/app.const';
import {ApiAuthService} from 'app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

@Injectable()
export class AccountConnectionService 
{
    onSearchResultsChanged: BehaviorSubject<any>;
    onSelectedContactsChanged: Subject<any>;
     
    onSearchTextChanged: Subject<any>;
    onSortHeaderChanged: Subject<any>;
    onFilterChanged: Subject<any>;   
    onPageChanged: Subject<any>;
    searchResults: any[];    
    inAccountId:any;
    searchResultTotalCount:any;
    searchText: string;
    filterBy: string;
    pageNo:any;
    numPerPage:any;
    sortColumn:any;
    sortDirection:any;
    selectedContacts:any[];
    onApiCall:Subject<any>;
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
        private _matSnackBar: MatSnackBar,
        private _fuseSplashScreenService: FuseSplashScreenService,
    )
    {
        // Set the defaults
        this.onSearchResultsChanged = new BehaviorSubject([]);      
        this.onSearchTextChanged = new Subject();
        this.onFilterChanged = new Subject();       
        this.onPageChanged = new Subject();
        this.onSortHeaderChanged = new Subject();
        this.onSelectedContactsChanged = new Subject();

        this.searchResultTotalCount = 0;
        this.pageNo = 1;
        this.numPerPage = 10;
        this.searchText = '';
        this.filterBy = 'all';
        this.sortColumn = "formattedName";
        this.sortDirection = "asc";
        this.inAccountId = 0;
        this.onSearchTextChanged.subscribe(searchText => {
            if(this.searchText == searchText) return;
            this.searchText = searchText;
            this.pageNo = 1;        
            this.getAccountConnectionList();
        });
        this.onSelectedContactsChanged.subscribe(contacts => {
            this.selectedContacts = contacts;
        });

        this.onFilterChanged.subscribe(filter => {
            if (this.filterBy == filter) return;
            this.filterBy = filter;
            this.pageNo = 0;
            this.getAccountConnectionList();
        });
        this.onPageChanged.subscribe(pagedata => {
            this.pageNo = pagedata.pageNo;
            this.numPerPage = pagedata.numPerPage;
            this.getAccountConnectionList();
        });
        this.onSortHeaderChanged.subscribe(sortHeader => {
            if(!sortHeader['direction']){
                return;
            }
            this.pageNo = 0;
            this.sortColumn = sortHeader['active'];
            this.sortDirection = sortHeader['direction'];
            this.getAccountConnectionList();
        });
        this.onApiCall = new Subject();
        this.onApiCall.subscribe(res=>{
          
            if(res=="calling")
             this._fuseSplashScreenService.show()
             else
             this._fuseSplashScreenService.hide()
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    
    ngOnInit(): void{
        
    }
    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    private jwt(): any {
        const tokenStr = this._token.get();
        if (tokenStr) {
            const headers = new HttpHeaders().set('Authorization', 'Bearer ' + tokenStr);
            return headers;
        } else {
            return '';
        }
    }

   
    getAccountConnectionList(): Promise<any>
    {
        this.onApiCall.next("calling");
        return new Promise((resolve, reject) => {
                // this._httpClient.get('api/contacts-contacts')  
                let params = new HttpParams();
                params = params.set('pageNo', this.pageNo);
                params = params.set('numPerPage', this.numPerPage);
                params = params.set('searchText', this.searchText);
                params = params.set('filterBy',this.filterBy);
                params = params.set('sortColumn',this.sortColumn);
                params = params.set('sortDirection',this.sortDirection);
                params = params.set('in_account_id',this.inAccountId);
                this._httpClient.get(Constants.API_URL + '/api/getAccountConnectionList', { params:params,headers: this.jwt()})
                    .subscribe((response: any) => {
                        this.onApiCall.next("done");
                        this.searchResults = response['contacts_list'];                       
                        this.searchResultTotalCount  = response['totalCount'];
                        this.onSearchResultsChanged.next(this.searchResults);
                        resolve(this.searchResults);
                    }, error => {
                        this.onApiCall.next("done");
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                    });
            }
        );
    }
    getContactsJSON(in_account_id){
        let params = new HttpParams();
        this.onApiCall.next("calling");
        params = params.set('in_account_id', in_account_id); 
        return new Promise((resolve, reject) => {
                this._httpClient.get(Constants.API_URL + '/api/getContactsJSONByAccountId', { params:params,headers: this.jwt()})
                    .subscribe((response: any) => {
                        this.onApiCall.next("done");
                        // console.log("resolve");
                        resolve(response['json']);
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
    getContactMessages(id:any,ID1:any): Promise<any>
    {
        let params = new HttpParams();
        params = params.set('id', id);
        params = params.set('ID1', ID1);  
        this.onApiCall.next("calling");
        return new Promise((resolve, reject) => {
            this._httpClient.get(Constants.API_URL + '/api/getContactMessages', {params:params, headers: this.jwt()})
                .subscribe((response: any) => { 
                    this.onApiCall.next("done");                   
                    resolve(response);                  
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
    sendContactMessage(data): Promise<any>{
        return new Promise((resolve, reject) => {
            this.onApiCall.next("calling");
            this._httpClient
                .post(Constants.API_URL + '/api/sendContactMessage', data, {headers: this.jwt()})
                .subscribe(
                    response => {
                        this.onApiCall.next("done");
                        resolve(response);
                    },
                    error => {
                        this.onApiCall.next("done");
                        if (error.status == 301) {
                            this._auth.logout();
                        }
                        this._matSnackBar.open('Error, ' + error.error['message'], 'OK', {
                            verticalPosition: 'top',
                            duration        : 3500
                        });
                    }
                );
        });
    }
   
   
}

