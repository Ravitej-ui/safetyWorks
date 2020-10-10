import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Validators, FormBuilder } from '@angular/forms';
import { AdminsClient } from 'src/app/sdk/copyright-app.sdk';

@Component({
  selector: 'app-billings',
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.scss']
})
export class BillingsComponent implements OnInit {
  displayedColumns = [ 'name', 'price', 'tokens', 'country', 'city', 'status', 'createdDateTime'];
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
    this.service.getBillings(this.filterForm.value.fromDate, this.filterForm.value.toDate).subscribe(
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
