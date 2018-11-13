import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleSigninComponent } from './components/google-signin/google-signin.component';

const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'test',
        pathMatch: 'full'
    },
    {
        path: 'test',
        component: GoogleSigninComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
