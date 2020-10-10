import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/account.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  userName: string = '';
  admin = false;
  constructor(private accountService:AccountService) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.admin = this.accountService.admin;
  }
  resize(): void{
  }

}
