import { AfterViewInit, Component } from '@angular/core';
import { GoogleSigninService } from 'src/app/services/google-signin/google-signin.service';

// declare var gapi: any;

@Component({
    selector: 'app-google-signin',
    templateUrl: './google-signin.component.html',
})
export class GoogleSigninComponent implements AfterViewInit {

    constructor(private _googleSigninService: GoogleSigninService) {

    }

    ngAfterViewInit() {
        gapi.signin2.render('signin-button', {
            'scope': 'https://www.googleapis.com/auth/photoslibrary.readonly',
            'width': 224,
            'height': 40,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': param => this._onSignin(param)
        });
    }

    private _onSignin(googleUser: gapi.auth2.GoogleUser) {
        const authResponse: gapi.auth2.AuthResponse = googleUser.getAuthResponse();
        if (authResponse.access_token) {
            this._googleSigninService.accessToken = authResponse.access_token;
            this._googleSigninService.setTokenExpiration(authResponse.expires_at);
        }
        console.log(authResponse);
        console.log(googleUser.getBasicProfile()); // TODO parse and store user profile
    }

}
