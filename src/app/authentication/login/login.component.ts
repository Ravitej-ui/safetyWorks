import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthClient, SignIN } from 'src/app/sdk/copyright-app.sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { AppNotificationService } from 'src/app/app-notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show = false;
  hide = true;
  showSpinner = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authClient: AuthClient, private router: Router, private appNote: AppNotificationService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    this.showSpinner = true;
    if (this.loginForm.valid) {
      let sign = new SignIN(this.loginForm.value);
      this.authClient.signIN(sign).subscribe(data => {
        if (data) {
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('userName', data.name);
          localStorage.setItem('nEMAddress', data.nEMAddress);
          localStorage.setItem('initials', this.getInitials(data.name));
          this.showSpinner = false;
          this.appNote.emitWallet();
          if (returnUrl) {
            this.router.navigate([returnUrl]);
            return;
          }
          else
            this.router.navigate(['/dashboard']);
        }
        else {
          alert('Email / Password does not match.');
          // this.toastService.error('Email / Password does not match.',
          //   'Login Failed', { tapToDismiss: true, progressBar: true, closeButton: true, opacity: 1, timeOut: 3000 });
        }
      });
    }
    else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key).markAsDirty();
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
    return initials;
  }
}
