import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectUserEmail} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';
import {logout} from '../../store/user/actions/user.actions';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public authStatus: WritableSignal<AuthorizationStatus> = signal<AuthorizationStatus>(AuthorizationStatus.UNKNOWN);
  public email: WritableSignal<string | undefined> = signal<string | undefined>(undefined);
  public readonly AppRoute = AppRoute;
  public readonly AuthorizationStatus = AuthorizationStatus;
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(takeUntil(this.destroySubject)).subscribe(authStatus => this.authStatus.set(authStatus));
    this.store.select(selectUserEmail).pipe(takeUntil(this.destroySubject)).subscribe(email => this.email.set(email));
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  public onSignOut() {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(logout());
      this.router.navigate([AppRoute.MAIN]);
    }
  }

}
