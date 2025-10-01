import {Component, inject, OnDestroy, OnInit, signal, WritableSignal,} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {OfferPreview} from '../../core/models/offers';
import {City} from '../../core/models/city';
import {DEFAULT_CITY} from '../../core/constants/const';
import {combineLatest, distinctUntilChanged, Subject, takeUntil, tap} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAllOffers, selectCity,} from '../../store/app/selectors/app.selectors';
import {OfferListComponent} from '../../features/offer-list/offer-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [HeaderComponent, OfferListComponent],
})
export class MainComponent implements OnInit, OnDestroy {
  public offers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>([]);
  public currentCity: WritableSignal<City> = signal<City>(DEFAULT_CITY);

  private store: Store<AppState> = inject(Store<AppState>);
  private destroySubject: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    combineLatest([
      this.store.select(selectAllOffers),
      this.store.select(selectCity).pipe(
        distinctUntilChanged(
          (previous, current) =>
            previous.name === current.name,
        ),
        tap((city) => this.currentCity.set(city)),
      )
    ]).pipe(takeUntil(this.destroySubject)).subscribe(([offers ,]) => {
      this.offers.set(offers);
      console.log(offers)
    });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
