import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthClient, AppUser, ValidationsClient } from 'src/app/sdk/copyright-app.sdk';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUPComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private authClient: AuthClient, private fb: FormBuilder, private router: Router,
    private validationsClient: ValidationsClient) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      userID: ['00000000-0000-0000-0000-000000000000', []],
      fullName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      gender: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      profession: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [this.validateEmailNotTaken.bind(this)]],
      password: ['', [Validators.required]],
      tokens: [0, []],
      referalCode: ['', [], [this.validateReferalCode.bind(this)]],
      referalPoints: [0, []],
      privateKey: ['', []],
      nemAddress: ['', []],
      isDeleted: [false, []],
      createdDateTime: [new Date(), []],
      lastUpdatedTime: [new Date(), []],
    });
  }
  get fullName() {
    return this.registerForm.get('fullName');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get gender() {
    return this.registerForm.get('gender');
  }
  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }
  get profession() {
    return this.registerForm.get('profession');
  }
  hasError(args: boolean) {
    if (this.registerForm.get('phoneNumber').errors && !this.registerForm.get('phoneNumber').errors.phoneNumber) {
      return;
    }
    if (!args) {
      this.registerForm.get('phoneNumber').setErrors({ 'phoneNumber': true });
    }
    else {
      this.registerForm.get('phoneNumber').setErrors(null);
    }
  }
  getNumber(args) {
    this.registerForm.get('phoneNumber').patchValue(args);
  }
  telInputObject(args) {
    //console.log(args);
  }
  onCountryChange(args) {
    //console.log(args);
  }
  onSubmit() {
    if (this.registerForm.valid) {
      let apppUser = new AppUser(this.registerForm.value);
      this.authClient.register(apppUser).subscribe(data => {
        // this.toastService.info('Registration for your account ' + apppUser.email + ' successful. Please login to continue',
        //   'Registration Successful', { tapToDismiss: true, progressBar: true, closeButton: true, opacity: 1, timeOut: 3000 });
        this.router.navigate(['/login']);
      });
    }
    else {
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key).markAsDirty();
      });
      return;
    }
  }
  validateEmailNotTaken(control: AbstractControl) {
    return this.validationsClient.isEmailTaken(control.value).pipe(map(res => {
      return res ? { emailTaken: true } : null;
    }));
  }
  validateReferalCode(control: AbstractControl) {
    if (control.value == undefined || control.value == '')
      return of(null);
    return this.validationsClient.isReferalCodeExists(control.value).pipe(map(res => {
      return res ? null : { referal: true };
    }));
  }
}
