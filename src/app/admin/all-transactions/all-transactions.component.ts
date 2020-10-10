import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { AdminsClient } from 'src/app/sdk/copyright-app.sdk';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.scss']
})
export class AllTransactionsComponent implements OnInit {
  displayedColumns = [ 'type', 'transactionDateTime', 'fileName', 'tokens', 'totalTokensLeft'];
  length = 4;
  pageSize = 10;
  loading = true;
  pageSizeOptions = [10, 25, 50, 100];
  dataSource = new MatTableDataSource();
  filterForm = this.fb.group({
    fromDate: [new Date(), Validators.required],
    toDate: [new Date(), Validators.required]
  });
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: AdminsClient, public snackBar: MatSnackBar, private fb: FormBuilder) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatHeader(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }
 
  setTabData(): void {
    this.loading = true;
    this.service.getTransactions(this.filterForm.value.fromDate, this.filterForm.value.toDate).subscribe(
      (data) => {
        this.dataSource.data = data;
        this.loading = false;
      }
    );
  }
  onSubmit(): void{
    if(this.filterForm.valid){
      this.setTabData();
    }
  }
  ngOnInit() {
    this.setTabData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
