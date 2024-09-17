import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.keycloak.isLoggedIn();

    if (!isLoggedIn) {
      // Redirect the user to the custom login page
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
