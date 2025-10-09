import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';
import { rootReducer } from './store/app/reducer/app.reducer';
import { OfferEffects } from './store/offer/effects/offer.effects';
import { UserAuthEffects } from './store/user/effects/user-auth.effects';
import { UserLoginEffects } from './store/user/effects/user-login.effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserLogoutEffect } from './store/user/effects/user-logout.effects';
import {FavoriteOfferEffects} from './store/favorite-offer/effects/favorite-offer.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEffects(
      OfferEffects,
      UserAuthEffects,
      UserLoginEffects,
      UserLogoutEffect,
      FavoriteOfferEffects
    ),
    provideStore(rootReducer),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
};
