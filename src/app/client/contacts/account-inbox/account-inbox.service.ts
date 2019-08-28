import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {ApiTokenService} from 'app/services/token.service';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as Constants from 'app/app.const';
import {ApiAuthService} from 'app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';


@Injectable()
export class AccountInboxService 
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
    onContactClick:Subject<any>;
    onContactIsClickFromInboxList:Subject<any>;
    
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
        this.pageNo = 0;
        this.numPerPage = 10;
        this.searchText = '';
        this.filterBy = 'replied';
        this.sortColumn = "formattedName";
        this.sortDirection = "asc";
        this.inAccountId = 0;
        this.onSearchTextChanged.subscribe(searchText => {
            if(this.searchText == searchText) return;
            this.searchText = searchText;
            this.pageNo = 0;        
            this.getAccountInboxList();
        });
        this.onSelectedContactsChanged.subscribe(contacts => {
            this.selectedContacts = contacts;
            console.log(this.selectedContacts);
        });

        this.onFilterChanged.subscribe(filter => {
            if (this.filterBy == filter) return;
            this.filterBy = filter;
            this.pageNo = 0;
            this.getAccountInboxList();
        });
        this.onPageChanged.subscribe(pagedata => {
            this.pageNo = pagedata.pageNo;
            this.numPerPage = pagedata.numPerPage;
            this.getAccountInboxList();
        });
        this.onSortHeaderChanged.subscribe(sortHeader => {
            if(!sortHeader['direction']){
                return;
            }
            this.pageNo = 0;
            this.sortColumn = sortHeader['active'];
            this.sortDirection = sortHeader['direction'];
            this.getAccountInboxList();
        });
        this.onApiCall = new Subject();
        this.onContactClick= new Subject();
        this.onContactIsClickFromInboxList=new Subject();
        this.onApiCall.subscribe(res=>{
          
            if(res=="calling")
             this._fuseSplashScreenService.show()
             else
             this._fuseSplashScreenService.hide()
        });
        this.onContactClick.subscribe(res=>{
            if(res.istatus=='unread'){
                this.update(
                    { id: res.iid, status: "read",type:"status" }
                )
            }
            res.istatus="read";
        })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    

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

   
    getAccountInboxList(): Promise<any>
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
                this._httpClient.get(Constants.API_URL + '/api/getAccountInboxList', { params:params,headers: this.jwt()})
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
    
    contactIsClickFromChatPanel(id:any,ID1:any,contact:any):Promise<any>{
       this.onContactClick.next(contact); 
       return this.getInboxMessages(id,ID1);
    }
    contactIsClickFromInboxList(contact:any){
        this.onContactClick.next(contact); 
        this.onContactIsClickFromInboxList.next(contact); 
       
     }
    getInboxMessages(id:any,ID1:any): Promise<any>
    {
        let params = new HttpParams();
        params = params.set('id', id);
        params = params.set('ID1', ID1);  
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
    sendInboxMessage(data): Promise<any>{
        return new Promise((resolve, reject) => {
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
    
    update(fields): Promise<any> {
        this.onApiCall.next("calling");
        fields.in_account_id=this.inAccountId;
        return new Promise((resolve, reject) => {

            this._httpClient
                .post(Constants.API_URL + '/api/updateInbox', {...fields}, { headers: this.jwt()})
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
                    }
                );
    });
    }
   
}

