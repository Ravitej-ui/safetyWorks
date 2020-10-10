import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { AppUser } from 'src/app/sdk/copyright-app.sdk';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<ConfirmationComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: AppUser) { }

  ngOnInit() {
  }
  close(): void{
    this._bottomSheetRef.dismiss(false);
  }
  approve(): void{
    this._bottomSheetRef.dismiss(true);
  }
}
