import { Component, OnDestroy, OnInit, ViewEncapsulation, ElementRef ,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Form } from '@angular/forms';
import { Subject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { AccountInboxService } from './account-inbox.service';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { DatePipe } from '@angular/common';
import { filter ,take} from 'rxjs/operators';
@Component({
    selector     : 'app-account-inbox',
    templateUrl  : './account-inbox.component.html',
    styleUrls    : ['./account-inbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AccountInboxComponent implements OnInit, OnDestroy
{
    inAccountId:any;
    isLoading = false;       
    searchInput: FormControl;
    filter: FormControl;
    filters:any[];
    pageSize = 10;
    searchText = '';
    filterText = 'all';
    selectedContacts: any[];    
    totalCount: any;
    pageIndex = 0;      
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    @ViewChild(MatPaginator) paginator: MatPaginator;    
    // Private
    private _unsubscribeAll: Subject<any>;
    
    constructor (
        private _fuseSidebarService: FuseSidebarService,
        private _accountInboxService: AccountInboxService,
        private _activatedRoute: ActivatedRoute,
        public _matSnackBar: MatSnackBar,
        public _matDialog: MatDialog,
        private _datePipe: DatePipe  ,
        private _router: Router       
    )
    {   this.selectedContacts = [];    
        this._unsubscribeAll = new Subject();
             
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;    
        this._router.events
        .pipe(
            filter((event => event instanceof NavigationEnd)),
            take(1)
        )
        .subscribe(() => {
            setTimeout(() => {                      
                this._accountInboxService.getAccountInboxList();
            });
        });   
        this.filters = [
            {
                value: 'replied',
                text: 'All Replies'
            },
            {
                value: 'read',
                text:'Read'
            },
            {
                value: 'unread',
                text:'Unread'
            },
            
                  
        ];
        this.searchInput = new FormControl('');
        this.filter = new FormControl('replied');
       
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.searchInput = new FormControl('');
        this.filter = new FormControl('replied');
        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(1000),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this.searchText = searchText;
                this._accountInboxService.onSearchTextChanged.next(searchText);
            });
        this.filter.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(100),
                distinctUntilChanged()
            )
            .subscribe(value => {
                this.filterText = value;
                this._accountInboxService.onFilterChanged.next(value);
            });
        this.totalCount = this._accountInboxService.searchResultTotalCount;     
        this._accountInboxService.onSearchResultsChanged
            .subscribe(users => {                
                this.totalCount = this._accountInboxService.searchResultTotalCount;
                this.pageIndex = this._accountInboxService.pageNo - 1;
                this.pageSize = this._accountInboxService.numPerPage;                
            });
        this._accountInboxService.onSelectedContactsChanged.subscribe(contacts => {
            this.selectedContacts = contacts;               
        });
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
    
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
    onSetPage(event): void {
        this.pageSize = event.pageSize;
        this._accountInboxService.onPageChanged.next({pageNo: event.pageIndex + 1, numPerPage: event.pageSize});
    }

   
    
    
}
