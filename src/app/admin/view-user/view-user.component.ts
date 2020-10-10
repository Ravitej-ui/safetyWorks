import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminsClient, AppUser } from 'src/app/sdk/copyright-app.sdk';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  user: AppUser;
  constructor(private route: ActivatedRoute, private adminsClient: AdminsClient) {
    this.adminsClient.getUser(this.route.snapshot.params['id']).subscribe(data=> {
      this.user = data;
    })
  }

  ngOnInit() {
  }

}
