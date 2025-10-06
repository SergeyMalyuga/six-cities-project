import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../core/constants/const';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CapitalizePipe, RouterLink],
})
export class CardComponent {
  @Input({ required: true }) offer!: OfferPreview;

  public readonly Math = Math;
  protected readonly AppRoute = AppRoute;
}
