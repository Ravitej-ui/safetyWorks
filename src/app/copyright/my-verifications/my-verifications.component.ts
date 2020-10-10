import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { CopyRightClient, VerificationDModel } from 'src/app/sdk/copyright-app.sdk';
import { ReportingService } from 'src/app/sdk/reporting.service';

@Component({
  selector: 'app-my-verifications',
  templateUrl: './my-verifications.component.html',
  styleUrls: ['./my-verifications.component.scss']
})
export class MyVerificationsComponent implements OnInit {

  displayedColumns = ['fileName', 'registrationDate', 'verificationDate', 'status', 'actions'];
  length = 4;
  pageSize = 10;
  loading = true;
  pageSizeOptions = [10, 25, 50, 100];
  verifications: VerificationDModel[];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: CopyRightClient, public snackBar: MatSnackBar, public reportService: ReportingService) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatHeader(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

  downloadCertificate(str: string) {
    const data = this.verifications.find(x=> x.verificationID === str);
    this.reportService.downloadVerificationCertificate(data);
  }

  setTabData(): void {
    this.service.getVerifications().subscribe(
      (data) => {
        this.verifications = data;
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
