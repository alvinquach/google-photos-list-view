import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePhotosBaseUrl } from 'src/app/constants/api-enpoint.constants';
import { Albums } from 'src/app/models/album.model';

@Injectable()
export class GooglePhotosAlbumsService {

    private readonly MaxPageSize = 50;

    private readonly BaseUrl = `${GooglePhotosBaseUrl}/v1/albums`;

    constructor(private _httpClient: HttpClient) {

    }

    addEnrichment(callback: (res) => void, albumId: string, error?: (err) => void): void {
        // TODO Implement this
    }

    create(callback: (res) => void, error?: (err) => void): void {
        // TODO Implement this
    }

    get(callback: (res) => void, albumId: string, error?: (err) => void): void {
        // TODO Implement this
    }

    list(callback: (res) => void, params: AlbumsListParams, error?: (err) => void): void {
        this._httpClient.get(
            `${this.BaseUrl}?` +
            (params.pageSize ? `pageSize=${params.pageSize}` : '') +
            (params.pageToken ? `&pageToken=${params.pageToken}` : '')
        ).subscribe(callback, error);
    }

    share(callback: (res) => void, albumId: string, error?: (err) => void): void {
        // TODO Implement this
    }

    listAll(callback: (res) => void, error?: (err) => void): void {
        const albums: Albums = [];

        const listRecursively = (nextPageToken?) => {
            this.list(
                (res) => {
                    albums.push(...res.albums);
                    if (res.nextPageToken) {
                        listRecursively(res.nextPageToken);
                    }
                    else {
                        callback({ albums: albums });
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

}

export interface AlbumsListParams {
    pageSize?: number;
    pageToken?: string;
    excludeNonAppCreatedData?: boolean;
}
