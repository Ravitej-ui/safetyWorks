import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { Registration } from '../sdk/copyright-app.sdk';

@Component({
  selector: 'app-transaction-notification',
  templateUrl: './transaction-notification.component.html',
  styleUrls: ['./transaction-notification.component.scss']
})
export class TransactionNotificationComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Registration, public dialogRef: MatSnackBarRef<TransactionNotificationComponent>) { }

  ngOnInit() {
  }
  close(){
    this.dialogRef.dismiss();
  }
}
