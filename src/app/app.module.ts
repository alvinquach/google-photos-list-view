import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleSigninComponent } from './components/google-signin/google-signin.component';
import { MediaItemsComponent } from './components/media-items/media-items.component';
import { GoogleCredentialsService } from './services/google-credentials/google-credentials.service';
import { GooglePhotosMediaItemsService } from './services/google-photos/google-photos-media-items.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GoogleCredentialsInterceptor } from './services/google-credentials/google-credentials.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        GoogleSigninComponent,
        MediaItemsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GoogleCredentialsInterceptor,
            multi: true
        },
        GoogleCredentialsService,
        GooglePhotosMediaItemsService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
