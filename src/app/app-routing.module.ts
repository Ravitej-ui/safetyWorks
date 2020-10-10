import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignUPComponent } from './authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { RegistrationComponent } from './copyright/registration/registration.component';
import { MyRegistrationsComponent } from './copyright/my-registrations/my-registrations.component';
import { MyReferalsComponent } from './profile/my-referals/my-referals.component';
import { MyTransactionsComponent } from './profile/my-transactions/my-transactions.component';
import { VerificationComponent } from './copyright/verification/verification.component';
import { MyVerificationsComponent } from './copyright/my-verifications/my-verifications.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { DashboardComponent } from './copyright/dashboard/dashboard.component';
import { PurchaseTokenComponent } from './purchase-token/purchase-token.component';
import { ReferalPointsEarnedComponent } from './profile/referal-points-earned/referal-points-earned.component';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { UserAuthGuard } from './guards/user-auth-guard.service';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUPComponent },
  { path: 'purchase', component: PurchaseTokenComponent, canActivate:[UserAuthGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent, canActivate:[UserAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[UserAuthGuard] },
  { path: 'profile', component: ViewProfileComponent, canActivate:[UserAuthGuard] },
  { path: 'updateprofile', component: UpdateProfileComponent, canActivate:[UserAuthGuard] },
  { path: 'register', component: RegistrationComponent, canActivate:[UserAuthGuard] },
  { path: 'myregistrations', component: MyRegistrationsComponent, canActivate:[UserAuthGuard] },
  { path: 'myreferals', component: MyReferalsComponent, canActivate:[UserAuthGuard] },
  { path: 'transactions', component: MyTransactionsComponent, canActivate:[UserAuthGuard] },
  { path: 'verify', component: VerificationComponent, canActivate:[UserAuthGuard] },
  { path: 'myverifications', component: MyVerificationsComponent, canActivate:[UserAuthGuard] },
  { path: 'resetpassword/:id', component: ResetPasswordComponent },
  { path: 'referalpointsearned', component: ReferalPointsEarnedComponent, canActivate:[UserAuthGuard] },
  { path: 'admin', loadChildren: 'src/app/admin/admin.module#AdminModule', canActivate:[AdminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
