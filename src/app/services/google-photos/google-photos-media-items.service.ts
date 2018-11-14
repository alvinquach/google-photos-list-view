import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePhotosBaseUrl } from 'src/app/constants/api-enpoint.constants';
import { MediaItems } from 'src/app/models/media-item.model';


@Injectable()
export class GooglePhotosMediaItemsService {

    private readonly MaxPageSize = 100;

    private readonly BaseUrl = `${GooglePhotosBaseUrl}/v1/mediaItems`;

    constructor(private _httpClient: HttpClient) {

    }

    batchCreate(callback: (res) => void, batchCreate, error?: (err) => void): void {
        // TODO Implement this
    }

    get(callback: (res) => void, mediaItemId: string, error?: (err) => void): void {
        this._httpClient.get(this.BaseUrl).subscribe(callback, error);
    }

    list(callback: (res) => void, params: MediaItemsListParams, error?: (err) => void): void {
        this._httpClient.get(
            `${this.BaseUrl}?` +
            (params.pageSize ? `pageSize=${params.pageSize}` : '') +
            (params.pageToken ? `&pageToken=${params.pageToken}` : '')
        ).subscribe(callback, error);
    }

    search(callback: (res) => void, search = {}, error?: (err) => void): void {
        this._httpClient.post(`${this.BaseUrl}:search`, search).subscribe(callback, error);
    }

    listAll(callback: (res) => void, error?: (err) => void): void {
        const mediaItems: MediaItems = [];

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
                    pageSize: this.MaxPageSize,
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
            pageSize: this.MaxPageSize
        };
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
