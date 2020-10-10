import { AppService } from '../app.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

export class CopyrightAppContext{
    constructor(private service: AppService){}
    getBaseUrl(params): string{
        return environment.api;
    }
    transformOptions(options: any) {
        const token = localStorage.getItem('token');
        if (token) {
            let clone = Object.assign({}, options);
            clone.headers = options.headers.set("Authorization", 'Bearer ' + token);
            return of(clone);
        }
        else {
            return of(options);
        }
    }
}