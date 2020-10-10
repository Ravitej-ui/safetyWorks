import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Registration } from './sdk/copyright-app.sdk';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    // Observable navItem source
    // private _registrationListener = new BehaviorSubject<Registration>(new Registration());
    // // Observable navItem stream
    // navItem$ = this._registrationListener.asObservable();
    // // service command
    // emitRegistration(reg) {
    //     this._registrationListener.next(reg);
    // }
}