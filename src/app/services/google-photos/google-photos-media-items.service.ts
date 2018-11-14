import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GooglePhotosBaseUrl } from 'src/app/constants/api-enpoint.constants';

const MaxPageSize = 100;

@Injectable()
export class GooglePhotosMediaItemsService {

    constructor(private _httpClient: HttpClient) {

    }

    batchCreate(callback, error, batchCreate): void {
        // TODO Implement this
    }

    get(callback: (res) => void, mediaItemId: string, error?: (err) => void): void {
        this._httpClient.get(`${GooglePhotosBaseUrl}/v1/mediaItems/${mediaItemId}`).subscribe(callback, error);
    }

    list(callback: (res) => void, pageSize?: number, pageToken?: string, error?: (err) => void): void {
        this._httpClient.get(
            `${GooglePhotosBaseUrl}/v1/mediaItems?` +
            (pageSize ? `pageSize=${pageSize}` : '') +
            (pageToken ? `&pageToken=${pageToken}` : '')
        ).subscribe(callback, error);
    }

    search(callback: (res) => void, search = {}, error?: (err) => void): void {
        this._httpClient.post(`${GooglePhotosBaseUrl}/v1/mediaItems:search`, search).subscribe(callback, error);
    }

    listAll(callback: (res) => void, error?: (err) => void): void {
        const mediaItems = [];
        let i = 0;
        const listRecursively = (nextPageToken?) => {
            i++;
            this.list((res) => {
                console.log("CALLED " + i)
                mediaItems.push(...res.mediaItems);
                if (res.nextPageToken) {
                    listRecursively(res.nextPageToken);
                }
                else {
                    callback({ mediaItems: mediaItems });
                }
            }, 100, nextPageToken);
        };

        listRecursively();
    }

}
