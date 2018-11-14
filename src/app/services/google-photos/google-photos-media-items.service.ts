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

    list(callback: (res) => void, params: MediaItemsListParams, error?: (err) => void): void {
        this._httpClient.get(
            `${GooglePhotosBaseUrl}/v1/mediaItems?` +
            (params.pageSize ? `pageSize=${params.pageSize}` : '') +
            (params.pageToken ? `&pageToken=${params.pageToken}` : '')
        ).subscribe(callback, error);
    }

    search(callback: (res) => void, search = {}, error?: (err) => void): void {
        this._httpClient.post(`${GooglePhotosBaseUrl}/v1/mediaItems:search`, search).subscribe(callback, error);
    }

    listAll(callback: (res) => void, error?: (err) => void): void {
        const mediaItems = [];

        const listRecursively = (nextPageToken?) => {
            this.list(
                (res) => {
                    mediaItems.push(...res.mediaItems);
                    if (res.nextPageToken) {
                        listRecursively(res.nextPageToken);
                    }
                    else {
                        callback({ mediaItems: mediaItems });
                    }
                },
                {
                    pageSize: 100,
                    pageToken: nextPageToken
                },
                error
            );
        };

        listRecursively();
    }

    searchAll(callback: (res) => void, search = {}, error?: (err) => void): void {
        const mediaItems = [];
        search = {
            ...search,
            pageSize: 100
        };
        console.log(search)
        const searchRecursively = (nextPageToken?) => {
            this.search(
                (res) => {
                    mediaItems.push(...res.mediaItems);
                    if (res.nextPageToken) {
                        searchRecursively(res.nextPageToken);
                    }
                    else {
                        callback({ mediaItems: mediaItems });
                    }
                },
                {
                    ...search,
                    pageToken: nextPageToken
                },
                error
            );
        };

        searchRecursively();
    }

}

export interface MediaItemsListParams {
    pageSize?: number;
    pageToken?: string;
}
