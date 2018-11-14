import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GooglePhotosMediaItemsService } from 'src/app/services/google-photos/google-photos-media-items.service';
import { GoogleCredentialsService } from 'src/app/services/google-credentials/google-credentials.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-media-items',
    templateUrl: './media-items.component.html',
    styleUrls: ['./media-items.component.scss']
})
export class MediaItemsComponent implements OnInit, OnDestroy {

    private _accessTokenSubscription: Subscription;

    constructor(private _credentialsService: GoogleCredentialsService,
                private _mediaItemsService: GooglePhotosMediaItemsService) {

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

    private _loadItems(search = {}) {
        // this._mediaItemsService.search((res) => {
        //     console.log(this);
        //     console.log(res);
        // });
        this._mediaItemsService.listAll((res) => {
            console.log(res);
        });
    }

}
