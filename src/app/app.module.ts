import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { GoogleSigninComponent } from './components/google-signin/google-signin.component';
import { MediaItemsComponent } from './components/media-items/media-items.component';
import { GoogleCredentialsInterceptor } from './services/google-credentials/google-credentials.interceptor';
import { GoogleCredentialsService } from './services/google-credentials/google-credentials.service';
import { GooglePhotosAlbumsService } from './services/google-photos/google-photos-albums.service';
import { GooglePhotosMediaItemsService } from './services/google-photos/google-photos-media-items.service';
import { MdcWebModule } from './modules/mdc-web.module';

@NgModule({
    declarations: [
        AppComponent,
        GoogleSigninComponent,
        AlbumsComponent,
        MediaItemsComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MdcWebModule
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
        GooglePhotosAlbumsService,
        GooglePhotosMediaItemsService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
