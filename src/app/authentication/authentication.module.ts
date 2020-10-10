import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUPComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AppMaterialDesignModule } from '../app.material-design.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Ng2TelInputModule } from 'ng2-tel-input';



@NgModule({
  declarations: [LoginComponent, SignUPComponent, ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AppMaterialDesignModule,
    ReactiveFormsModule,
    RouterModule,
    Ng2TelInputModule
  ]
})
export class AuthenticationModule { }
