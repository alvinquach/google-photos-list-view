import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageAccessTokenName, LocalStorageTokenExpirationName } from 'src/app/constants/local-storage.constants';

@Injectable()
export class GoogleCredentialsService {

    private _accessToken: string;

    private _tokenExpiration: number;

    public readonly accessTokenObservable: BehaviorSubject<string>;

    constructor() {
        const accessToken = this.accessToken;
        this.accessTokenObservable = new BehaviorSubject<string>(accessToken);
    }

    get accessToken(): string {
        let changed = false;
        if (!this._accessToken) {
            const accessToken = localStorage.getItem(LocalStorageAccessTokenName);
            if (accessToken) {
                this._accessToken = accessToken;
                changed = true;
            }
        }
        if (this.isTokenExpired()) {
            this._accessToken = null;
            localStorage.removeItem(LocalStorageAccessTokenName);
            localStorage.removeItem(LocalStorageTokenExpirationName);
            changed = true;
        }
        if (changed && this.accessTokenObservable) {
            this.accessTokenObservable.next(this._accessToken);
        }
        return this._accessToken;
    }

    set accessToken(value: string) {
        if (this._accessToken != value) {
            localStorage.setItem(LocalStorageAccessTokenName, this._accessToken = value);
            this.accessTokenObservable.next(value);
        }
    }

    setTokenExpiration(expiration: number) {
        localStorage.setItem(LocalStorageTokenExpirationName, String(this._tokenExpiration = expiration));
    }

    isTokenExpired(): boolean {
        if (this._tokenExpiration == undefined) {
            const tokenExpiration = localStorage.getItem(LocalStorageTokenExpirationName);
            this._tokenExpiration = tokenExpiration ? parseInt(tokenExpiration) : 0;
        }
        return new Date().getTime() > this._tokenExpiration;
    }

}
