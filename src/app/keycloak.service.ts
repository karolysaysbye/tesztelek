import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class KeycloakInitService {
  constructor(private keycloak: KeycloakService) {}

  init(): Promise<boolean> {
    if (typeof window === 'undefined') {
      // If running in a non-browser environment (like SSR), skip initialization
      return Promise.resolve(true);
    }

    // Keycloak initialization for browser environment
    return this.keycloak.init({
      config: {
        url: 'https://keycloak.hasas3.hu',  // Your Keycloak URL
        realm: 'teszt',                      // Your realm name
        clientId: 'angular-app',                // Your client ID
      },
      initOptions: {
        onLoad: 'login-required',               // Forces user to log in before accessing the app
        checkLoginIframe: false,
      }
    });
  }
}
