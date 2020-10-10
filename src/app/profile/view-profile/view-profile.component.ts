import { Component, OnInit } from '@angular/core';
import { AppUsersClient, AppUser } from 'src/app/sdk/copyright-app.sdk';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  user : AppUser;
  loading = true;
  constructor(private appUserClient: AppUsersClient) {
    appUserClient.getCurrentUser().subscribe(data=> {
      this.user = data;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
