import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    // Check if the window object is available to ensure we are in the browser environment
    if (typeof window === 'undefined') {
      // SSR environment: skip Keycloak initialization
      return Promise.resolve(true);
    }

    // Browser environment: Initialize Keycloak
    return keycloak.init({
      config: {
        url: 'https://keycloak.hasas3.hu/auth', // Your Keycloak URL
        realm: 'teszt',                         // Your realm name
        clientId: 'angular-app',                // Your client ID
      },
      initOptions: {
        onLoad: 'login-required',               // Forces user to log in before accessing the app
        checkLoginIframe: false,
      },
    });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(KeycloakAngularModule),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
};
