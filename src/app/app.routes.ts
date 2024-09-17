import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProtectedComponent } from './protected/protected.component';
import { AuthGuard } from './auth.guard';
import { ServersComponent } from './servers/servers.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'login', component: LoginComponent },  // Custom login page
    { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] }, 
    { path: 'servers', component: ServersComponent, canActivate: [AuthGuard] }, 
    { path: 'form', component: FormComponent } ,
    { path: '**', redirectTo: '' } // Fallback route
  ];