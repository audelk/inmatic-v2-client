import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-crm-dialog',
  templateUrl: './crm-dialog.component.html',
  styleUrls: ['./crm-dialog.component.scss']
})
export class CrmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CrmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  ok(): void {
    this.dialogRef.close({ok:true,note:this.data.note});
  }
  cancel(): void {
    this.dialogRef.close({});
  }
}
