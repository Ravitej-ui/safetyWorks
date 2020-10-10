import { Component, OnInit, ViewChild } from '@angular/core';
import { AppUsersClient } from 'src/app/sdk/copyright-app.sdk';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-my-transactions',
  templateUrl: './my-transactions.component.html',
  styleUrls: ['./my-transactions.component.scss']
})
export class MyTransactionsComponent implements OnInit {
  displayedColumns = [ 'type', 'transactionDateTime', 'fileName', 'tokens', 'totalTokensLeft'];
  length = 4;
  pageSize = 10;
  loading = true;
  pageSizeOptions = [10, 25, 50, 100];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: AppUsersClient, public snackBar: MatSnackBar) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatHeader(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

 
  setTabData(): void {
    this.service.getTransactions().subscribe(
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
