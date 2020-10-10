import { Component, OnInit } from '@angular/core';
import { AuthClient } from 'src/app/sdk/copyright-app.sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  loading = true;
  constructor(private authClient: AuthClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    authClient.checkResetPassword(this.route.snapshot.params['id']).subscribe(data => {
      if (!data) {
        alert('request expired / invalid request');
        this.router.navigate(['']);
      }
      else {
        this.loading = false;
        this.resetPasswordForm.get('confirmationID').patchValue(this.route.snapshot.params['id']);
      }
    }, error => {
      alert('invalid request');
      this.router.navigate(['']);
    });
  }
  resetPasswordForm = this.fb.group({
    confirmationID: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, { validator: MustMatch('password', 'confirmPassword') });

  get password() {
    return this.resetPasswordForm.get('password');
  }
  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }
  ngOnInit() {
  }
  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.authClient.resetPassword(this.resetPasswordForm.value).subscribe(data => {
        if (data.code === 1) {
          alert(data.message);
          this.router.navigate(['/login']);
        }
        else {
          alert(data.message);
        }
      });
    }
    else {
      Object.keys(this.resetPasswordForm.controls).forEach(key => {
        this.resetPasswordForm.get(key).markAsDirty();
      });
      return;
    }
  }
}
