import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthClient, SignIN } from 'src/app/sdk/copyright-app.sdk';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  showSpinner = false;
  changePasswordForm = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: MustMatch('newPassword', 'confirmPassword') });
  constructor(private fb: FormBuilder, private authClient: AuthClient, private router: Router) { }

  ngOnInit() {
  }
  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }
  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }
  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.authClient.changePassword(this.changePasswordForm.value).subscribe(data => {
        if (data.code === 1) {
          alert(data.message);
          this.router.navigate(['/dashboard']);
        }
        else {
          alert(data.message);
          // this.toastService.error('Email / Password does not match.',
          //   'Login Failed', { tapToDismiss: true, progressBar: true, closeButton: true, opacity: 1, timeOut: 3000 });
        }
      });
    }
    else {
      Object.keys(this.changePasswordForm.controls).forEach(key => {
        this.changePasswordForm.get(key).markAsDirty();
      });
      return;
    }
  }
  getInitials(str: string): string {
    const arr = str.split(' ');
    let initials: string = '';
    arr.forEach(x => {
      initials += x.substring(0, 1);
    });
    console.log(initials);
    return initials;
  }
}
