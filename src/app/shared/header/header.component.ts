import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus, selectUserEmail} from '../../store/app/selectors/app.selectors';
import {Subject, takeUntil} from 'rxjs';

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
  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.store.select(selectAuthStatus).pipe(takeUntil(this.destroySubject)).subscribe(authStatus => this.authStatus.set(authStatus));
    this.store.select(selectUserEmail).pipe(takeUntil(this.destroySubject)).subscribe(email => this.email.set(email));
  }

  ngOnDestroy() {
    this.destroySubject.next();
    this.destroySubject.complete();
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
