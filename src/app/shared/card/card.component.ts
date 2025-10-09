import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../core/constants/const';
import { ToggleFavoriteOffersDirective } from '../directives/toggle-favorite-offers.directive';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CapitalizePipe, RouterLink, ToggleFavoriteOffersDirective],
})
export class CardComponent {
  @Input({ required: true }) offer!: OfferPreview;

  public readonly Math = Math;
  public readonly AppRoute = AppRoute;
}
