import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';

@Injectable({
    providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

    constructor(private router: Router, private accountService: AccountService) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.accountService.loggedIn) {
            return true;
        } else if (this.accountService.user) {
            this.router.navigate(['/not-found']);
            return false;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
