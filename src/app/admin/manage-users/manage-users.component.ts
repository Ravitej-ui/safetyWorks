import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatBottomSheet } from '@angular/material';
import { AdminsClient, AppUser } from 'src/app/sdk/copyright-app.sdk';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  displayedColumns = [ 'fullName', 'gender', 'profession', 'tokens', 'referalPoints', 'role', 'createdDateTime', 'actions'];
  length = 4;
  pageSize = 10;
  loading = true;
  pageSizeOptions = [10, 25, 50, 100];
  dataSource = new MatTableDataSource();
  arr: AppUser[];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private service: AdminsClient, public snackBar: MatSnackBar, private router: Router, private bottomSheet: MatBottomSheet) { }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatHeader(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  }
 
  setTabData(): void {
    this.loading = true;
    this.service.getUsers().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.arr = data;
        this.loading = false;
      }
    );
  }
  view(id: string): void{
    this.router.navigate(['admin/viewuser', id ])
  }

  toggle(id: string): void{
    let user = this.arr.find(x=> x.userID === id);
    const bottomSheetRef = this.bottomSheet.open(ConfirmationComponent, {
      data: user
    });
    bottomSheetRef.afterDismissed().subscribe((data?: boolean)=> {
      if(data){
        this.service.toggleDisable(id).subscribe(val=> {
          user.isDisabled = val;
          this.dataSource.data = this.arr;
        });
      }
    })
  }

  ngOnInit() {
    this.setTabData();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
}
