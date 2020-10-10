import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUsersClient } from 'src/app/sdk/copyright-app.sdk';
import { MatSort, MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { ReportingService } from 'src/app/sdk/reporting.service';

@Component({
  selector: 'app-my-referals',
  templateUrl: './my-referals.component.html',
  styleUrls: ['./my-referals.component.scss']
})
export class MyReferalsComponent implements OnInit {

  displayedColumns = ['userName', 'email', 'pointsEarned'];
  length = 4;
  pageSize = 10;
  loading = true;
  pageSizeOptions = [10, 25, 50, 100];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: AppUsersClient, public snackBar: MatSnackBar, public reportService: ReportingService) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatHeader(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

  setTabData(): void {
    this.service.getReferals().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.loading = false;
      }
    );
  }
  ngOnInit() {
    this.setTabData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
