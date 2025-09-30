import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthGuard} from './core/guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEffects(),
    provideStore(),
    provideHttpClient(withInterceptorsFromDi()),
    AuthGuard
  ],
};
