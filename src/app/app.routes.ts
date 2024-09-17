import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { ServersComponent } from './servers/servers.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }, 
    { path: 'servers', component: ServersComponent, canActivate: [AuthGuard] }, 
  ];
