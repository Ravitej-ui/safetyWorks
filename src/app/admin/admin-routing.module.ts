import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { BillingsComponent } from './billings/billings.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { NemTransactionsComponent } from './nem-transactions/nem-transactions.component';
import { ViewUserComponent } from './view-user/view-user.component';


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: 'alltransactions',
      component: AllTransactionsComponent,
    }, {
      path: 'billings',
      component: BillingsComponent,
    }, {
      path: 'manageusers',
      component: ManageUsersComponent,
    }, {
      path: 'viewuser/:id',
      component: ViewUserComponent,
    }, {
      path: 'nemtransactions',
      component: NemTransactionsComponent,
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '**',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
