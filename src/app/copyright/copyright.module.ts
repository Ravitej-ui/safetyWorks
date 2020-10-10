import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { MyRegistrationsComponent } from './my-registrations/my-registrations.component';
import { VerificationComponent } from './verification/verification.component';
import { MyVerificationsComponent } from './my-verifications/my-verifications.component';
import { AppMaterialDesignModule } from '../app.material-design.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenAlertComponent } from './token-alert/token-alert.component';



@NgModule({
  declarations: [RegistrationComponent, MyRegistrationsComponent, VerificationComponent, MyVerificationsComponent, DashboardComponent, TokenAlertComponent],
  imports: [
    CommonModule,
    AppMaterialDesignModule,
    NgxFileDropModule,
    ReactiveFormsModule
  ],
  entryComponents: [TokenAlertComponent]
})
export class CopyrightModule { }
