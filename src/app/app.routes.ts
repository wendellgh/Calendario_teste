import { Routes } from '@angular/router';
import { CalendarioComponent } from './calendario/calendario.component';
import { KanbamComponent } from './kanbam/kanbam.component';
import {ModalAddTaskComponent} from './kanbam/modal-add-task/modal-add-task.component';
import { MenuBkComponent } from './Modal/menu-bk/menu-bk.component';

export const routes: Routes = [
    {path: '', component: CalendarioComponent, pathMatch: 'full'},
    {path: 'kanbam', component: KanbamComponent},
    {path:'add', component: ModalAddTaskComponent},
    {path:'menu', component: MenuBkComponent}
];
