import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private authService: AuthService = inject(AuthService);

  intercept(req: HttpRequest<Request>, next: HttpHandler): Observable<HttpEvent<Request>> {
    const token = this.authService.getToken();
    if (token) {
      const reqClone = req.clone({
        headers: req.headers.set('x-token', token)
      })
      return next.handle(reqClone);
    }
    return next.handle(req);
  }
}
