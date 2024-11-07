import { Routes, provideRouter } from '@angular/router';
import { TareaListComponent } from './Components/tarea-list/tarea-list.component';
import { UsuarioListComponent } from './Components/usuario-list/usuario-list.component';
export const routes: Routes = [
    {path: 'tareas', component: TareaListComponent},
    {path: 'usuarios', component: UsuarioListComponent},
    {path: '**', redirectTo: '/tareas', pathMatch: 'full'}
];

export const appRouterProviders = [provideRouter(routes)]; 