import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { GoogleCredentialsService } from './google-credentials.service';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleCredentialsInterceptor implements HttpInterceptor {

    constructor(private _googleCredentialsService: GoogleCredentialsService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this._googleCredentialsService.accessToken;

        if (!accessToken) {
            // TODO Throw error or refresh access token.
        }
        else {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(req);
    }

}
