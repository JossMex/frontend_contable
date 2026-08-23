import { authInterceptor } from './core/interceptors/auth.interceptor';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// Registrar el locale en español
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {provide: LOCALE_ID, useValue: 'es'} // idioma español
  ]
};
