import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registration, AppUsersClient } from './sdk/copyright-app.sdk';


@Injectable({
    providedIn: 'root'
})
export class AppNotificationService {
    constructor(private appUsersClient: AppUsersClient){}
    private _registrationListener = new BehaviorSubject<Registration>(new Registration());
    transactionListner$ = this._registrationListener.asObservable();
    emitRegistration(reg) {
        this._registrationListener.next(reg);
    }
    private _walletListener = new BehaviorSubject<number>(+localStorage.getItem('balance'));
    walletListner$ = this._walletListener.asObservable();
    emitWallet() {
        this.appUsersClient.getBalance().subscribe(data=> {
            this._walletListener.next(data);
        });
    }
}