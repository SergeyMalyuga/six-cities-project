import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {APIRoute, BASE_URL} from '../constants/const';

@Injectable(
  {providedIn: 'root'}
)
export class UserApiService {
  private http: HttpClient = inject(HttpClient);

  public checkAuthStatus(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`);
  }

  public postUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, {email, password});
  }

  public deleteUser(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.LOGIN}`);
  }
}
