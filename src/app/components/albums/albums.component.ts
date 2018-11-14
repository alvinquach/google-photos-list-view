import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Albums, Album } from 'src/app/models/album.model';
import { GoogleCredentialsService } from 'src/app/services/google-credentials/google-credentials.service';
import { GooglePhotosAlbumsService } from 'src/app/services/google-photos/google-photos-albums.service';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {

    private _accessTokenSubscription: Subscription;

    private _loading: boolean;

    private _albums: Albums;

    constructor(private _router: Router,
                private _credentialsService: GoogleCredentialsService,
                private _albumsService: GooglePhotosAlbumsService) {

    }

    get loading(): boolean {
        return this._loading;
    }

    get albums(): Albums {
        return this._albums;
    }

    ngOnInit() {
        this. _accessTokenSubscription = this._credentialsService.accessTokenObservable.subscribe((value) => {
            if (!value) {
                return;
            }
            this._loadItems();
        });
    }

    ngOnDestroy() {
        this. _accessTokenSubscription && this. _accessTokenSubscription.unsubscribe();
    }

    viewAlbum(album: Album) {
        this._router.navigate(['album', album.id]);
    }

    private _loadItems() {
        this._loading = true;
        this._albumsService.listAll(
            this._onItemsLoaded.bind(this),
            this._onItemsLoadError.bind(this)
        );
    }

    private _onItemsLoaded(res: { albums: Albums }): void {
        console.log(res);
        this._albums = res.albums;
        this._loading = false;
    }

    private _onItemsLoadError(error) {
        console.log(error);
        this._loading = false;
    }

}
