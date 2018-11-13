import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GoogleSigninService {

    private readonly LocalStorageAccessTokenName = 'access_token';
    private readonly LocalStorageTokenExpirationName = 'token_expiration';

    private _accessToken: string;

    private _tokenExpiration: number;

    public readonly accessTokenObservable: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    get accessToken(): string {
        let changed = false;
        if (!this._accessToken) {
            const accessToken = localStorage.getItem(this.LocalStorageAccessTokenName);
            if (accessToken) {
                this._accessToken = accessToken;
                changed = true;
            }
        }
        if (this.isTokenExpired()) {
            this._accessToken = null;
            localStorage.removeItem(this.LocalStorageAccessTokenName);
            localStorage.removeItem(this.LocalStorageTokenExpirationName);
            changed = true;
        }
        if (changed) {
            this.accessTokenObservable.next(this._accessToken);
        }
        return this._accessToken;
    }

    set accessToken(value: string) {
        if (this._accessToken != value) {
            localStorage.setItem(this.LocalStorageAccessTokenName, this._accessToken = value);
            this.accessTokenObservable.next(value);
        }
    }

    setTokenExpiration(expiration: number) {
        localStorage.setItem(this.LocalStorageTokenExpirationName, String(this._tokenExpiration = expiration));
    }

    isTokenExpired(): boolean {
        if (this._tokenExpiration == undefined) {
            const tokenExpiration = localStorage.getItem(this.LocalStorageTokenExpirationName);
            this._tokenExpiration = tokenExpiration ? parseInt(tokenExpiration) : 0;
        }
        return new Date().getTime() > this._tokenExpiration;
    }

}
