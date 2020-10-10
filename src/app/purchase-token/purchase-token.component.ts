import { Component, OnInit } from '@angular/core';
import { PaymentsClient, BillingModel } from '../sdk/copyright-app.sdk';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AppNotificationService } from '../app-notification.service';

@Component({
  selector: 'app-purchase-token',
  templateUrl: './purchase-token.component.html',
  styleUrls: ['./purchase-token.component.scss']
})
export class PurchaseTokenComponent implements OnInit {
  cost = new FormControl();
  billingForm: FormGroup = this.fb.group({
    name: ['', Validators.compose([Validators.required])],
    street: ['', Validators.compose([Validators.required])],
    pincode: ['', Validators.compose([Validators.required])],
    city: ['', Validators.compose([Validators.required])],
    country: ['', Validators.compose([Validators.required])],
    tokens: ['', Validators.compose([Validators.required])],
  });
  constructor(private paymentClient: PaymentsClient, private fb: FormBuilder, private appNote: AppNotificationService) { }

  ngOnInit() {
    this.billingForm.get('tokens').valueChanges.subscribe((data: string)=> {
      this.cost.patchValue(data + '$');
    });
  }


  onSubmit() {
    if (this.billingForm.valid) {
      let billingModel = new BillingModel(this.billingForm.value);
      this.paymentClient.buyPackage(billingModel).subscribe(data => {
        if(data){
          alert('Successfully transfered');
          this.appNote.emitWallet();
        }
      });
    }
    else {
      Object.keys(this.billingForm.controls).forEach(key => {
        this.billingForm.get(key).markAsDirty();
      });
      return;
    }
  }
}
