import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-alert',
  templateUrl: './token-alert.component.html',
  styleUrls: ['./token-alert.component.scss']
})
export class TokenAlertComponent implements OnInit {
  balance: number;
  constructor(public dialogRef: MatDialogRef<TokenAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
    this.balance = +localStorage.getItem('balance');
  }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  purchase(){
    this.router.navigate(['/purchase']);
    this.dialogRef.close();
  }
}
