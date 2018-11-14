import { Photo } from './photo.model';
import { Video } from './video.model';

export interface MediaMetadata {
    creationTime?: string;
    width?: string;
    height?: string;
    photo?: Photo;
    video?: Video;
}