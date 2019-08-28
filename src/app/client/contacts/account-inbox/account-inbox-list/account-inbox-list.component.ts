import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { AccountInboxService } from '../account-inbox.service';
import { MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
@Component({
    selector: 'account-inbox-list',
    templateUrl: './account-inbox-list.component.html',
    styleUrls: ['./account-inbox-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AccountInboxListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;
    @ViewChild(MatSort) sort: MatSort;
    // @ViewChild(MatPaginator) paginator: MatPaginator;
    searchResults: any;
    dataSource: MatTableDataSource<any> | null;
    displayedColumns = ['picture', 'formattedName', 'title', 'company', 'location', 'latest_activity',  'star'];
    selectedSearchResults: any[];
    checkboxes: {};
    selectedContacts: any[];
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _accountInboxService: AccountInboxService,
        public _matDialog: MatDialog,
        private _cd: ChangeDetectorRef,
        private _matSnackBar: MatSnackBar,
        private _fuseSidebarService: FuseSidebarService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {

        this._accountInboxService.onSearchResultsChanged.subscribe(res => {
            this.dataSource = new MatTableDataSource(res);
        });

        this._accountInboxService.onSearchResultsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(searchResults => {
                this.searchResults = searchResults;
                this.checkboxes = {};
                this.selectedContacts = [];
                this._accountInboxService.onSelectedContactsChanged.next(this.selectedContacts)
                searchResults.map(searchResult => {
                    this.checkboxes[searchResult.ID2] = false;
                });
                this._cd.detectChanges();
            });
        
          
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    onSelectedChange(ID2, ID1, value): void {
        // console.log(contactId,value);
        if (value) {
            this.selectedContacts.push({
                'ID2': ID2,
                'ID1': ID1,
            });
        } else {
            for (var i in this.selectedContacts) {
                var one_contact = this.selectedContacts[i];
                if (one_contact.ID2 == ID2 && one_contact.ID1 == ID1) {
                    this.selectedContacts.splice(+i, 1);
                    break;
                }
            }
        }
        this._accountInboxService.onSelectedContactsChanged.next(this.selectedContacts);

    }

    /**
     * Toggle star
     *
     * @param contactId
     */
    toggleStar(id): void {

    }
    customSort($event) {
        this._accountInboxService.onSortHeaderChanged.next($event);
    }

    updateStar(contact, star) {
        let that = this;
        if (star != -1)
            this._accountInboxService.update({ id: contact.iid, star: star,type:"star" })
                .then((res) => {
                    // Show the success message
                    if(res.status)
                    this._matSnackBar.open(res.success, 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    else
                    this._matSnackBar.open(res.error, 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                    this._accountInboxService.getAccountInboxList();
                }).catch(err => {
                    this._matSnackBar.open("error updating", 'OK', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                });
    }

    contactClick(contact){

        this._fuseSidebarService.getSidebar('chatPanel').unfoldTemporarily();
        this._accountInboxService.onContactIsClickFromInboxList.next(contact);
        this._accountInboxService.onContactClick.next(contact);
        contact.istatus="read";
    }
}


