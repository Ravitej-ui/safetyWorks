import { Component, OnInit, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { Registration } from './sdk/copyright-app.sdk';
import { AppNotificationService } from './app-notification.service';
import { TransactionNotificationComponent } from './transaction-notification/transaction-notification.component';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  private _hubConnection: HubConnection;
  @ViewChild('drawer', { static: false }) drawer: MatDrawer;
  specialPage: boolean;
  isLoggedIn = false;
  userName = '';
  initials = '';
  balance: number;
  signalRTime: Date;
  isDark = false;
  private specialPages: any[] = [
    '',
    'login',
    'signup',
    'forgotpassword',
    'resetpassword'
  ];

  private currentUrl = '';

  constructor(
    private router: Router, private location: Location, private appNote: AppNotificationService, private snackBar: MatSnackBar,
    private accountService: AccountService
  ) {
    this.router.events.subscribe((route: any) => {
      try {
        if (route.routerEvent) {
          this.currentUrl = route.routerEvent.url.split('/')[1].split('?')[0];
        } else {
          this.currentUrl = route.url.split('/')[1].split('?')[0];
        }
        this.specialPage = this.specialPages.indexOf(this.currentUrl) !== -1;
      }
      catch {
        this.specialPage = true;
      }
      this.checkLogin();
    });
  }
  isSmall: boolean;
  ngOnInit(): void {
    this.appNote.walletListner$.subscribe(data => {
      this.balance = data;
      localStorage.setItem('balance', data.toString());
    });
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isSmall = window.innerWidth < 1000;
      if (!this.isSmall && this.drawer) {
        this.drawer.open();
      } else if (this.drawer) {
        this.drawer.close();
      }
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isSmall = window.innerWidth < 1000;
    if (!this.isSmall && this.drawer) {
      this.drawer.open();
    } else if (this.drawer) {
      this.drawer.close();
    }
  }
  goBack(): void {
    this.location.back();
  }
  checkLogin(): void {
    if (localStorage.getItem('token')) {
      this.accountService.authorize(localStorage.getItem('token'));
      this.isLoggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.initials = localStorage.getItem('initials');
      this.connectToHub();
    } else {
      if (this._hubConnection && this._hubConnection.state == 1) {
        this._hubConnection.stop();
      }
      this.isLoggedIn = false;
    }
  }
  logOut() {
    localStorage.clear();
    this.router.navigate(['']);
    this.checkLogin();
    this.signalRTime = undefined;
    this.isLoggedIn = false;
  }

  connectToHub(): void {
    let currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() - 10);
    if ((!this._hubConnection || this._hubConnection.state != 1) && (!this.signalRTime || this.signalRTime < currentTime)) {
      this.appNote.emitWallet();
      this._hubConnection = new HubConnectionBuilder()
        .withUrl(environment.api + '/notificationHub',
          { accessTokenFactory: () => localStorage.getItem('token') }).build();
      this.signalRTime = new Date();
      this._hubConnection.start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));
      this._hubConnection.on("receiveNotification", (data: any) => { this.notify(data) });
    }
  }
  notify(reg: any): void {
    let registration: Registration = new Registration();
    registration.init(reg);
    this.appNote.emitRegistration(registration);
    this.snackBar.openFromComponent(TransactionNotificationComponent, { data: registration, duration: 10000, verticalPosition: 'bottom', horizontalPosition: 'right' });
  }
}























  // blockSubscription;
  // unconfirmedTransactionsSubscription;

  // blocks: Block[] = [];
  // incomingTransactions: Transaction[] = [];
  // allTransactionsPaginated: Pageable<Transaction[]>;
  // allTransactions: Transaction[] = [];

  // // View
  // blockListenerActive = false;
  // unconfirmedTransactionsActive = false;
  // allTransactionsActive = false;
  // constructor(private blockchainListener: BlockchainListener,
  //   private unconfirmedTransactionListener: UnconfirmedTransactionListener,
  //   private accountHttp: AccountHttp) { }
  // startFetchingTransactions(address_raw: string) {
  //   try {
  //     const address = new Address(address_raw.trim());
  //     console.log(address);
  //     this.allTransactions = [];
  //     this.allTransactionsPaginated =
  //       this.accountHttp.allTransactionsPaginated(address, {
  //         pageSize: 5
  //       });

  //     this.allTransactionsPaginated.subscribe(x => {
  //       this.allTransactions = this.allTransactions.concat(x);
  //     });
  //     this.allTransactionsActive = true;
  //   } catch (e) {
  //     alert('malformed address');
  //   }

  // }

  // fetchMoreTransactions() {
  //   if (this.allTransactionsActive) {
  //     this.allTransactionsPaginated.nextPage();
  //   }
  // }

  // changeBlockListener() {
  //   if (this.blockListenerActive) {
  //     this.blockSubscription.unsubscribe();
  //     console.log('Unsubscribed');
  //   } else {
  //     this.blockSubscription = this.blockchainListener.newBlock()
  //       .subscribe(block => {
  //         console.log('NEW BLOCK', block);
  //         this.blocks.unshift(block);
  //       }, err => {
  //         console.error('blockchainListener', err);
  //       });
  //     console.log('subscribed');
  //   }
  //   this.blockListenerActive = !this.blockListenerActive;
  // }

  // stopUnconfirmedListener() {
  //   if (this.unconfirmedTransactionsActive) {
  //     this.unconfirmedTransactionsSubscription.unsubscribe();
  //     console.log('Unsubscribed');
  //   }
  //   this.unconfirmedTransactionsActive = false;
  // }

  // start(raw_address: string) {
  //   let address: Address;
  //   try {
  //     address = new Address(raw_address);
  //     this.unconfirmedTransactionsSubscription =
  //       this.unconfirmedTransactionListener
  //         .given(address)
  //         .subscribe(transaction => {
  //           console.log('unconfirmedTransactionListener for ' + raw_address, transaction);
  //           this.incomingTransactions.unshift(transaction);
  //         }, err => {
  //           console.error('unconfirmedTransactionListener for ' + raw_address, err)
  //         });
  //     this.unconfirmedTransactionsActive = true;
  //   } catch (e) {
  //     alert('malformed address');
  //   }

  // }
//}
