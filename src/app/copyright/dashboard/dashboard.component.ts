import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppUsersClient, DashboardModel } from 'src/app/sdk/copyright-app.sdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  list: DashboardModel[] = [];
  cards: Observable<DashboardModel[]>;

  constructor(private breakpointObserver: BreakpointObserver, private appUsersClient: AppUsersClient) {
    this.appUsersClient.getDashboardData().subscribe(data => {
      this.list = data;
      this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
          if (matches) {
            this.list.forEach(x => {
              x.cols = 2;
            });
          }
          else {
            this.list.forEach(x => {
              x.cols = 1;
            });
          }
          return this.list;
        })
      );
    });
  }
}
