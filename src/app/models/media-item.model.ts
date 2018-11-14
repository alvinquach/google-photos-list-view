import { MediaMetadata } from './media-metadata.model';
import { ContributorInfo } from './contributor-info.model';

export interface MediaItem {
    id?: string;
    description?: string;
    productUrl?: string;
    baseUrl?: string;
    mimeType?: string;
    mediaMetadata?: MediaMetadata;
    contributorInfo?: ContributorInfo;
    filename?: string;
}
