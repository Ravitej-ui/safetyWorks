import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Classification, CopyRightClient, DDLClient, FileParameter, Response } from 'src/app/sdk/copyright-app.sdk';
import { MatHorizontalStepper, MatDialog } from '@angular/material';
import { ReportingService } from 'src/app/sdk/reporting.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TokenAlertComponent } from '../token-alert/token-alert.component';
import { AppNotificationService } from 'src/app/app-notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  classy: Classification[]=[];
  processing: boolean = false;
  filesToUpload: FileParameter[] = [];
  @ViewChild('stepper', { static: true }) stepper: MatHorizontalStepper;
  public files: NgxFileDropEntry[] = [];
  constructor(private copyRightClient: CopyRightClient, private reportingService: ReportingService, private fb: FormBuilder,
    public dialog: MatDialog, private appNote: AppNotificationService, private ddlService: DDLClient) { }
  fileFormArray = this.fb.array([this.fb.group({
    fileName: ['', Validators.required],
    data: [''],
    note: [''],
    classificationId: ['', [Validators.required]],
    isUploaded: [false],
    isInProgress: [false],
    failed: [false]
  })]);
  ngOnInit() {
    this.ddlService.getClassifications().subscribe(data=> {
      this.classy = data;
    })
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.processing = true;
    this.filesToUpload = [];
    let filesProcessed = 0;
    let noOfFiles = files.length;
    if (files.length > 0) {
      this.fileFormArray.clear();
      this.files = [];
      this.files = files;
      Array.from(files).map((droppedFile, index) => {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            filesProcessed += 1;
            this.uploadFileModel(file);
            if (filesProcessed == noOfFiles) {
              this.processing = false;
              this.stepper.next();
            }
          });
        } else {
          noOfFiles -= 1;
          if (filesProcessed == noOfFiles) {
            this.processing = false;
            this.stepper.next();
          }
        }
      });
    }
    else {

    }
  }

  public fileOver(event) {
    // Nothing to do
  }

  public fileLeave(event) {
    // Nothing to do
  }

  clearAll(): void {
    this.fileFormArray.clear();
    this.stepper.previous();
  }

  registerAll(): void {
    const formData = new FormData();
    let count = 0;
    for (let i = 0; i < this.fileFormArray.length; i++) {
      const group = this.fileFormArray.at(i);
      if (!group.get("isInProgress").value && !group.get("isUploaded").value && !group.get("failed").value) {
        const file: File = group.get("data").value as File;
        formData.append('file' + i, file, file.name);
        formData.append('note' + i, group.get("note").value);
        formData.append('class' + i, group.get("classificationId").value);
        count++;
        group.get("isInProgress").patchValue(true);
      }
    }
    const dialogRef = this.dialog.open(TokenAlertComponent, {
      width: '350px',
      data: { type: 'Copyright Registration', cost: count }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.reportingService.registerMultiple(formData).subscribe(resp => {
          let data = new Response();
          data.init(resp);
          this.appNote.emitWallet();
          for (let i = 0; i < this.fileFormArray.length; i++) {
            const group = this.fileFormArray.at(i);
            if (group.get("isInProgress")) {
              group.get("isInProgress").patchValue(false);
              if (data.code === 1) {
                group.get("isUploaded").patchValue(true);
              }
              else {
                group.get("failed").patchValue(true);
              }
            }
          }
        });
      }
    });

  }
  register(i: number) {
    const group = this.fileFormArray.at(i);
    group.get("isInProgress").patchValue(true);
    const file: File = group.get("data").value as File;
    this.copyRightClient.register({ data: file, fileName: file.name }, group.get("note").value, group.get("classificationId").value).subscribe(data => {
      group.get("isInProgress").patchValue(false);
      if (data.code == 1) {
        this.appNote.emitWallet();
        group.get("isUploaded").patchValue(true);
      }
      else {
        group.get("failed").patchValue(true);
      }
    });
  }
  remove(i: number) {
    this.fileFormArray.removeAt(i);
  }
  uploadFileModel(file: File): void {
    this.fileFormArray.push(this.fb.group({
      fileName: [file.name, Validators.required],
      data: [file],
      note: [''],
      classificationId: ['5ae5aef7-6ea1-4565-905b-dac1a4f816dc', [Validators.required]],
      isUploaded: [false],
      isInProgress: [false],
      failed: [false]
    }));
  }
}
