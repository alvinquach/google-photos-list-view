import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleSigninComponent } from './components/google-signin/google-signin.component';
import { GoogleSigninService } from './services/google-signin/google-signin.service';

@NgModule({
    declarations: [
        AppComponent,
        GoogleSigninComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        GoogleSigninService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
