import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MediaItems } from 'src/app/models/media-item.model';
import { GoogleCredentialsService } from 'src/app/services/google-credentials/google-credentials.service';
import { GooglePhotosMediaItemsService } from 'src/app/services/google-photos/google-photos-media-items.service';

@Component({
    selector: 'app-media-items',
    templateUrl: './media-items.component.html',
    styleUrls: ['./media-items.component.scss']
})
export class MediaItemsComponent implements OnInit, OnDestroy {

    private _accessTokenSubscription: Subscription;

    private _currentRequestId: number;

    private _albumId: string;

    private _mediaItems: MediaItems;

    constructor(private _activatedRoute: ActivatedRoute,
                private _credentialsService: GoogleCredentialsService,
                private _mediaItemsService: GooglePhotosMediaItemsService) {

    }

    get loading(): boolean {
        return this._currentRequestId != null;
    }

    get mediaItems(): MediaItems {
        return this._mediaItems;
    }

    ngOnInit() {
        this._albumId = this._activatedRoute.snapshot.params['albumId'];
        this. _accessTokenSubscription = this._credentialsService.accessTokenObservable.subscribe((value) => {
            if (!value) {
                return;
            }
            this._loadItems();
        });
    }

    ngOnDestroy() {
        this.loading && this._mediaItemsService.cancelRequest(this._currentRequestId);
        this. _accessTokenSubscription && this. _accessTokenSubscription.unsubscribe();
    }

    reloadItems() {
        this._loadItems();
    }

    private _loadItems() {
        if (this.loading) {
            this._mediaItemsService.cancelRequest(this._currentRequestId);
        }
        if (!this._albumId) {
            this._currentRequestId = this._mediaItemsService.listAll(
                this._onItemsLoaded.bind(this),
                this._onItemsLoadError.bind(this)
            );
        }
        else {
            this._currentRequestId = this._mediaItemsService.searchAll(
                this._onItemsLoaded.bind(this),
                { albumId: this._albumId },
                this._onItemsLoadError.bind(this));
        }
    }

    private _onItemsLoaded(res: { mediaItems: MediaItems }): void {
        this._mediaItems = res.mediaItems;
        this._currentRequestId = null;
    }

    private _onItemsLoadError(error) {
        console.error(error);
        this._currentRequestId = null;
    }

}
