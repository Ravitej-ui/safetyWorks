import { Component, OnInit, ViewChild } from '@angular/core';
import { FileParameter, CopyRightClient, VerificationDModel } from 'src/app/sdk/copyright-app.sdk';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { Router } from '@angular/router';
import { MatHorizontalStepper } from '@angular/material';
import { ReportingService } from 'src/app/sdk/reporting.service';
import * as PDFJS from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { TransactionHttp, TransferTransaction, PlainMessage } from 'nem-library';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  processing: boolean = false;
  verification: VerificationDModel;
  @ViewChild('stepper', { static: true }) stepper: MatHorizontalStepper;
  certificateText = '';
  certificateError = false;
  fileText = '';
  fileError = false;
  date: Date;
  public files: NgxFileDropEntry[] = [];
  certificate: File;
  file: File;

  constructor(private copyRightClient: CopyRightClient, private router: Router, private reportingService: ReportingService,
    private transactionHttp: TransactionHttp) { }

  ngOnInit() {
  }

  public certificateDropped(files: NgxFileDropEntry[]) {
    this.files = files;
    if (files.length > 1) {
      this.certificateText = 'You can only verify 1 certificate at a time';
      this.certificateError = true;
      this.certificate = undefined;
    }
    else if (files.length === 1) {
      for (const droppedFile of files) {

        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            let ext = fileEntry.name.substr(fileEntry.name.lastIndexOf('.') + 1);
            if (ext.toLowerCase() != 'pdf') {
              this.certificateError = true;
              this.certificate = undefined;
              this.certificateText = 'Certificate is invalid. Please upload a valid certificate.';
              return;
            }
            this.certificateText = 'Name: ' + fileEntry.name;
            this.certificate = file;
            this.certificateError = false;
            this.stepper.next();
          });
        } else {
          this.certificateText = 'Please upload a certificate to continue..';
          this.certificateError = true;
        }
      }
    }
    else {
      this.certificateText = 'Please upload a certificate to verify';
      this.certificateError = true;
      this.certificate = undefined;
    }
  }

  public fileDropped(files: NgxFileDropEntry[]) {
    this.files = files;
    if (files.length > 1) {
      this.fileText = 'You can only verify 1 file at a time';
      this.date = undefined;
      this.fileError = true;
      this.file = undefined;
    }
    else if (files.length === 1) {
      for (const droppedFile of files) {

        // Is it a file?
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            this.fileText = 'Name: ' + fileEntry.name;
            this.date = new Date(file.lastModified);
            this.file = file;
            this.fileError = false;
            this.stepper.next();
          });
        } else {
          this.fileText = 'Please upload a file to continue..';
          this.date = undefined;
          this.fileError = true;
        }
      }
    }
    else {
      this.fileText = 'Please upload a file to verify';
      this.fileError = true;
      this.date = undefined;
      this.certificate = undefined;
    }
  }

  verify(): void {
    this.processing = true;
    if (!this.certificate) {
      this.certificateText = 'Please upload a certificate to verify';
      this.certificateError = true;
      this.certificate = undefined;
      this.stepper.selectedIndex = 0;
    }
    else if (!this.file) {
      this.fileText = 'Please upload a file to verify';
      this.fileError = true;
      this.date = undefined;
      this.certificate = undefined;
      this.stepper.selectedIndex = 1;
    }
    else {
      const file: FileParameter = { fileName: this.file.name, data: this.file }
      PDFJS.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      let reader = new FileReader();
      reader.onload = (event: any) => {
        PDFJS.getDocument(event.target.result).then(pdf => {
          if (pdf.numPages === 1) {
            pdf.getPage(1).then(page => {
              const n = page.pageNumber;
              page.getTextContent().then(content => {
                const hash = content.items[3].str;
                this.transactionHttp.getByHash(hash).subscribe((trn: TransferTransaction) => {
                  this.copyRightClient.verify(file, hash, (trn.message as PlainMessage).plain()).subscribe(data => {
                    this.verification = data;
                    this.processing = false;
                  });
                });
              });
            });
          }
          else {
            alert('Invalid Certificate');
            this.stepper.selectedIndex = 0;
          }
        });
      }
      reader.readAsArrayBuffer(this.certificate);
    }
  }

  downloadCertificate(): void {
    this.reportingService.downloadVerificationCertificate(this.verification);
  }
}
