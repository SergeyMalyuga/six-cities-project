import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { Router, RouterLink } from '@angular/router';
import { AppRoute, AuthorizationStatus } from '../../core/constants/const';
import { ToggleFavoriteOfferDirective } from '../directives/toggle-favorite-offer.directive';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import {
  selectAuthStatus,
  selectFavoriteOffersLoading,
} from '../../store/app/selectors/app.selectors';
import { filter, Subject, takeUntil } from 'rxjs';
import { changeFavoriteStatus } from '../../store/favorite-offer/actions/favorite-offer.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CapitalizePipe, RouterLink, ToggleFavoriteOfferDirective],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) offer!: OfferPreview;

  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
  public authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);
  public isFavoriteDisabled: WritableSignal<boolean> = signal<boolean>(false);

  private store: Store<AppState> = inject(Store<AppState>);
  private router: Router = inject(Router);
  private destroySubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.store
      .select(selectAuthStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((status: AuthorizationStatus) => this.authStatus.set(status));
  }

  public onFavoriteOfferToggled() {
    this.isFavoriteDisabled.set(true);
    if (this.authStatus() !== AuthorizationStatus.AUTH) {
      this.router.navigate([AppRoute.LOGIN]);
      this.isFavoriteDisabled.set(false);
    } else {
      this.store.dispatch(
        changeFavoriteStatus({
          offerId: this.offer.id,
          status: +!this.offer.isFavorite,
        }),
      );
      this.store
        .select(selectFavoriteOffersLoading)
        .pipe(
          takeUntil(this.destroySubject),
          filter((isLoading: boolean) => !isLoading),
        )
        .subscribe(() => this.isFavoriteDisabled.set(false));
    }
  }
}
