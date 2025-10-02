import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {CapitalizePipe} from '../pipes/capitalize.pipe';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CapitalizePipe
  ]
})
export class CardComponent {
  @Input({required: true}) offer!: OfferPreview;
  protected readonly Math = Math;
}
