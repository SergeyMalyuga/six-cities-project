import {ChangeDetectionStrategy, Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Offer} from '../../core/models/offers';
import {ActivatedRoute} from '@angular/router';
import {OfferApiService} from '../../core/services/offer-api.service';
import {Subject, takeUntil} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    CapitalizePipe
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent {
  public offer: WritableSignal<Offer | undefined> = signal<Offer | undefined>(undefined);

  private offerId: WritableSignal<string | null> = signal<string | null>(null);
  private activeRoute = inject(ActivatedRoute);
  private offerApiService: OfferApiService = inject(OfferApiService);
  private destroySubject: Subject<void> = new Subject<void>();

  constructor() {
    this.activeRoute.paramMap.subscribe(params => this.offerId.set(params.get('id')));
    effect(() => {
      const id = this.offerId();
      if (id) {
        this.offerApiService.getOfferById(id).pipe(takeUntil(this.destroySubject)).subscribe(offer => this.offer.set(offer))
      }
    })
  }
}
