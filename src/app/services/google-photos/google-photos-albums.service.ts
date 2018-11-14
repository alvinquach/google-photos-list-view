import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GooglePhotosBaseUrl } from 'src/app/constants/api-enpoint.constants';
import { Albums } from 'src/app/models/album.model';

@Injectable()
export class GooglePhotosAlbumsService {

    private readonly MaxPageSize = 50;

    private readonly BaseUrl = `${GooglePhotosBaseUrl}/v1/albums`;

    private readonly _requestStatus: boolean[] = [];

    constructor(private _httpClient: HttpClient) {

    }

    cancelRequest(requestId: number): void {
        this._requestStatus[requestId] = false;
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

    listAll(callback: (res) => void, error?: (err) => void): number {
        const requestId = this._requestStatus.length;
        this._requestStatus.push(true);

        const albums: Albums = [];

        const listRecursively = (nextPageToken?) => {
            this.list(
                (res) => {
                    albums.push(...res.albums);
                    if (!this._requestStatus[requestId]) {
                        return;
                    }
                    if (res.nextPageToken) {
                        listRecursively(res.nextPageToken);
                    }
                    else {
                        callback({ albums: albums });
                        this._requestStatus[requestId] = false;
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
        return requestId;
    }

}

export interface AlbumsListParams {
    pageSize?: number;
    pageToken?: string;
    excludeNonAppCreatedData?: boolean;
}
