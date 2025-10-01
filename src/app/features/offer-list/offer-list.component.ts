import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CardComponent} from '../../shared/card/card.component';

@Component({
  selector: 'app-offer-list',
  imports: [
    CardComponent
  ],
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferListComponent {
  @Input({required: true}) offers!: OfferPreview[];
}
