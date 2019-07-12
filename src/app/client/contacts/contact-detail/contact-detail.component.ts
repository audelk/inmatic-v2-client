import { Component, OnDestroy, OnInit, ChangeDetectionStrategy,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataSource } from '@angular/cdk/collections';
import { ContactsService } from 'app/client/contacts/contacts.service';
import { Observable, Subject } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { Contact } from 'app/client/contacts/contact.model';
import { InConnection } from 'app/client/contacts/inconnection.model';
import {MatSnackBar} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContactDialogComponent } from 'app/client/contacts/contact-detail/email-dialog/contact-dialog.component';
import {FuseConfirmDialogComponent} from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { ApiTokenService } from 'app/services/token.service';

export interface DialogData {
    animal: string;
    name: string;
  }

@Component({
    selector   : 'app-contact-detail',
    templateUrl: './contact-detail.component.html',
    styleUrls  : ['./contact-detail.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailComponent implements OnInit, OnDestroy
{
    
  
  
    contact:Contact;
    inConnection: InConnection;
    contactId:any;
    dataSource: FilesDataSource | null;
    checkboxes: {};
    isLoading:any;
    ranges:any[];
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;    
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
     
    constructor(
        private _formBuilder: FormBuilder,
        private _contactsService: ContactsService,
        private _activatedRoute : ActivatedRoute,
        private _router:Router,
        private _matSnackBar: MatSnackBar,
        public dialog: MatDialog,
        private _token: ApiTokenService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.contact = new Contact('');
        this.inConnection = new InConnection('');
        this.isLoading = false;
        this._activatedRoute.params.subscribe(params => {
            if (params['ID2']) {
                this.contactId = params['ID2'];               
                 this._contactsService.getContactById(this.contactId).then( res => {
                    this.contact = res['in_contact'];
                    this.inConnection = res['in_connection'];                                  
                    }).catch( err => {
                });    
            }}) 
        this.ranges = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];       
        
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    // -----------------------------------------------------------------------------------------------------
    // Add the contacts Not to DataBase
    // -----------------------------------------------------------------------------------------------------
    updateInConnectionNotes():void{
        var data = this.inConnection;        
        this._contactsService.updateInConnectionNotes(data).then( res=> {
            this._matSnackBar.open('Notes successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            this._router.navigate(['/client/contacts/']);

        }).catch( err => {
            this._matSnackBar.open('Notes update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    updateEnrichedData():void {       
            
        var data = this.inConnection;        
        this._contactsService.updateEnrichedData(data).then( res=> {
            this._matSnackBar.open('Enriched Data successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            this._router.navigate(['/client/contacts/']);

        }).catch( err => {
            this._matSnackBar.open('Enriched Data update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    enrichContact():void {
        if(!this.contact.email){
            this._matSnackBar.open("Email doesn't exist!", 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            return;
        }      
        if(this._token.getEnrichCredits() < 1){
            this._matSnackBar.open("You have not enough credits!", 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            return;
        }
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.confirmDialogRef.componentInstance.confirmMessage = 'You have ' + this._token.getEnrichCredits() + ' credits remaining.  ' + 'Are you sure you would like to proceed?';
        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result ) {
                var data = this.inConnection;
                this.isLoading = true;
                this._contactsService.enrichContact(data).then( res=> {
                    var message = 'Enrich Contact Successfully!';
                    if(res.message){
                        message = res.message;
                    }
                    this._matSnackBar.open(message, 'OK', {
                        verticalPosition: 'top',
                        duration        : 3500
                    });
                    this.inConnection = res.inConnection;
                    this.isLoading = false;
                    this._token.setEnrichCredits(res.validEnrichCredits);

                }).catch( err => {
                    this._matSnackBar.open('Enrich Contact failed!', 'OK', {
                        verticalPosition: 'top',
                        duration        : 3500
                    });
                    this.isLoading = false;
                });
            }
            this.confirmDialogRef = null;
        });
        
    }
    remiderChange(event: any) {
        this._contactsService.updateReminder(this.inConnection).then( res=> {
            this._matSnackBar.open('Reminder successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
            // this._router.navigate(['/client/contacts/']);

        }).catch( err => {
            this._matSnackBar.open('Reminder update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    selectChangeLabel(event: any){
        var data = this.inConnection;        
        this._contactsService.updateContactLabel(data).then( res=> {
            this._matSnackBar.open('Label successfully updated!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        }).catch( err => {
            this._matSnackBar.open('Label update failed!', 'OK', {
                verticalPosition: 'top',
                duration        : 3500
            });
        });
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(ContactDialogComponent, {
          width: '500px',
          data: {
            ID2: this.contactId
          }         
        });    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');          
        });
      }
    /**
     * On init
     */
    ngOnInit(): void
    {
        
        // this._activatedRoute.params.subscribe(params => {
        //     if (params['id']) {
        //         this.contactId = params['id'];               
        //          this._contactsService.getContactListById(this.contactId).then( res => {
        //             this.contacts = res['contactsListById'];
        //             console.log([Contact])                  
        //         }).catch( err => {

        //         });    
        //     }

        // })        
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

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: ContactsService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._contactsService.onContactsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
