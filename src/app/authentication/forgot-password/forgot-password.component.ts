import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthClient } from 'src/app/sdk/copyright-app.sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  showSpinner = false;
  fpForm: FormGroup;
  constructor(private fb: FormBuilder, private authClient: AuthClient, private router: Router) { }

  ngOnInit() {
    this.fpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get email() {
    return this.fpForm.get('email');
  }
  onSubmit(): void {
    if (this.fpForm.valid) {
      this.showSpinner = true;
      this.authClient.forgotPassword(this.email.value).subscribe(data => {
        this.showSpinner = false;
        if (data.code == 1) {
          alert(data.message);
          this.router.navigate(['']);
        }
        else {
          alert(data.message);
          // this.toastService.error('Email / Password does not match.',
          //   'Login Failed', { tapToDismiss: true, progressBar: true, closeButton: true, opacity: 1, timeOut: 3000 });
        }
      });
    }
    else {
      Object.keys(this.fpForm.controls).forEach(key => {
        this.fpForm.get(key).markAsDirty();
      });
      return;
    }
  }
}
