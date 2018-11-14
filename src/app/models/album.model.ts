export interface Album {
    id?: string;
    title?: string;
    productUrl?: string;
    isWriteable?: boolean;
    shareInfo?: any; // TODO Add model for this
    mediaItemsCount?: string;
    coverPhotoBaseUrl?: string;
    coverPhotoMediaItemId?: string;
}

export declare type Albums = Album[];
