import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CardComponent } from '../../shared/card/card.component';
import { SelectActiveCardDirective } from '../../shared/card/directives/select-active-card.directive';

@Component({
  selector: 'app-offer-list',
  imports: [CardComponent, SelectActiveCardDirective],
  templateUrl: './offer-list.component.html',
  styleUrl: './offer-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferListComponent {
  @Input({ required: true }) offers!: OfferPreview[];
  @Output() activeCardSelected: EventEmitter<OfferPreview | null> =
    new EventEmitter<OfferPreview | null>();

  public onActiveCardSelected(offer: OfferPreview | null) {
    this.activeCardSelected.emit(offer);
  }
}
