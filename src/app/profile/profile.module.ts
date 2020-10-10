import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MyTransactionsComponent } from './my-transactions/my-transactions.component';
import { MyReferalsComponent } from './my-referals/my-referals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialDesignModule } from '../app.material-design.module';
import { RouterModule } from '@angular/router';
import { ReferalPointsEarnedComponent } from './referal-points-earned/referal-points-earned.component';



@NgModule({
  declarations: [ChangePasswordComponent, ViewProfileComponent, UpdateProfileComponent, MyTransactionsComponent, MyReferalsComponent, ReferalPointsEarnedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialDesignModule,
    RouterModule
  ]
})
export class ProfileModule { }
