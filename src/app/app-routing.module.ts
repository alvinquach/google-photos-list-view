import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MediaItemsComponent } from './components/media-items/media-items.component';
import { AlbumsComponent } from './components/albums/albums.component';

const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: AlbumsComponent
    },
    {
        path: 'album/:albumId',
        component: MediaItemsComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
