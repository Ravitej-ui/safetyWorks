import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppUsersClient } from 'src/app/sdk/copyright-app.sdk';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  profileForm: FormGroup = this.fb.group({
    userID: ['', []],
    fullName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', []],
    phoneNumber: ['', [Validators.required]],
    profession: ['', [Validators.required]],
    password: ['', []],
    privateKey: ['', []],
    nemAddress: ['', []],
    tokens: ['', []],
    referalCode: ['', []],
    referrer: ['', []],
    referalPoints: ['', []],
    isDisabled: ['', []],
    createdDateTime: ['', []],
    lastUpdatedTime: ['', []],
  });
  get fullName() {
    return this.profileForm.get('fullName');
  }
  get password() {
    return this.profileForm.get('password');
  }
  get email() {
    return this.profileForm.get('email');
  }
  get gender() {
    return this.profileForm.get('gender');
  }
  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }
  get profession() {
    return this.profileForm.get('profession');
  }
  constructor(private fb: FormBuilder, private appUsersClient: AppUsersClient, private router: Router) { }

  ngOnInit() {
    this.appUsersClient.getCurrentUser().subscribe(data=> {
      this.profileForm.patchValue(data);
    });
  }


  onSubmit() {
    if (this.profileForm.valid) {
      this.appUsersClient.updateProfile(this.profileForm.value).subscribe(data => {
        alert('Successfully Saved');
        this.router.navigate(['/profile']);
      });
    }
    else {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key).markAsDirty();
      });
      return;
    }
  }

}
