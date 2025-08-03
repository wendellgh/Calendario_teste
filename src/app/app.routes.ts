import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { KanbamComponent } from './kanbam/kanbam.component';

export const routes: Routes = [
    // {path: '', component: AppComponent, pathMatch: 'full'},
    {path: 'kanbam', component: KanbamComponent}
];
