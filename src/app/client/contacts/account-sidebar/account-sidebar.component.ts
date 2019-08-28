import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
    selector   : 'app-account-sidebar',
    templateUrl: './account-sidebar.component.html',
    styleUrls  : ['./account-sidebar.component.scss']
})
export class AccountSidebarComponent implements OnInit, OnDestroy
{   
    navigations: any[];
    accountId: string;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _activatedRoute: ActivatedRoute
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._activatedRoute.params.subscribe(params => {
            if (params['accountid']) {
                this.accountId = params['accountid'];
                this.setNavigations();
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    setNavigations(): void {

        var prefixUrl = '/manager/accounts/' + this.accountId + '/';

        this.navigations = [
            {
                id: 'nav_account_dashboard',
                title: 'Dashboard',
                icon: 'dashboard',
                url:  prefixUrl + 'dashboard'
            },
            {
                id: 'nav_account_connections',
                title: 'Connections',
                icon: 'contacts',
                url: prefixUrl + 'connections'
            },
            {
                id: 'nav_account_responders',
                title : 'Messenger',
                icon: 'send',
                url: prefixUrl +  'responders'
            },
            {
                id: 'nav_account_connectors',
                title: 'Connector',
                icon: 'cast_connected',
                url: prefixUrl + 'connector'
            },
            {
                id: 'nav_account_search',
                title: 'Search',
                icon: 'search',
                url: prefixUrl + 'search'
            },
            {
                id: 'nav_account_extimport',
                title: 'Extimport',
                icon: 'import_export',
                url: prefixUrl + 'extimport'
            },
            {
                id: 'nav_account_inbox',
                title: 'Inbox',
                icon: 'inbox',
                url: prefixUrl + 'inbox'
            },
            {
                id: 'nav_accont_tasks',
                title: 'Tasks',
                icon: 'assignment',
                url: prefixUrl + 'tasks'
            }
        ];
    }
}
