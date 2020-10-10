import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  get loggedIn(): boolean {
    return this.admin || this.user;
  }
  admin = false;
  user = false;
  private _loginListener = new BehaviorSubject<boolean>(false);
  authorize(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      var res = JSON.parse(base64);
      this.admin = res['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin';
      this.user = res['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'user';
    } catch (error) {
      this.admin = false;
      this.user = false;
    }
  }
}
