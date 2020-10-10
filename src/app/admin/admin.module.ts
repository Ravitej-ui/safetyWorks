import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NemTransactionsComponent } from './nem-transactions/nem-transactions.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { BillingsComponent } from './billings/billings.component';
import { AdminComponent } from './admin.component';
import { AppMaterialDesignModule } from '../app.material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewUserComponent } from './view-user/view-user.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [DashboardComponent, NemTransactionsComponent, AllTransactionsComponent, ManageUsersComponent,
    BillingsComponent, AdminComponent, ViewUserComponent, ConfirmationComponent],
  entryComponents: [ConfirmationComponent],
  imports: [
    CommonModule,
    AppMaterialDesignModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
