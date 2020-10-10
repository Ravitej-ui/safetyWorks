import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { CopyRightClient, Registration } from 'src/app/sdk/copyright-app.sdk';
import { ReportingService } from 'src/app/sdk/reporting.service';
import { AppNotificationService } from 'src/app/app-notification.service';
import { TransactionHttp } from 'nem-library';

@Component({
  selector: 'app-my-registrations',
  templateUrl: './my-registrations.component.html',
  styleUrls: ['./my-registrations.component.scss']
})
export class MyRegistrationsComponent implements OnInit {
  displayedColumns = ['fileName', 'createdDateTime', 'notes', 'classification', 'certificate'];
  length = 4;
  pageSize = 10;
  loading = true;
  regs: Registration[] = [];
  pageSizeOptions = [10, 25, 50, 100];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: CopyRightClient, public snackBar: MatSnackBar, public reportService: ReportingService,
    private appNote: AppNotificationService, private transactionHttp: TransactionHttp) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatHeader(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }

  downloadCertificate(str: string) {
    this.service.getPdfReportData(str).subscribe(data => {
      this.transactionHttp.getByHash(data.hash).subscribe(trn => {
        data.createdDateTime = new Date(trn.timeWindow.timeStamp.toString());
        this.reportService.downloadCertificate(data);
      });
    })
  }

  setTabData(): void {
    this.service.getRegistrations().subscribe(
      (data) => {
        this.regs = data;
        this.dataSource.data = data;
        this.loading = false;
      }
    );
  }
  ngOnInit() {
    this.setTabData();
    this.appNote.transactionListner$.subscribe(data => {
      var reg = this.regs.find(x => x.registrationID === data.registrationID);
      if (reg) {
        reg.isPublished = data.isPublished;
        reg.inQueue = data.inQueue;
        this.dataSource.data = this.regs;
      }
      else{
        this.setTabData();
      }
    });
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
