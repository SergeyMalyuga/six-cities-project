import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { OfferPreview } from '../../../core/models/offers';

@Directive({
  selector: '[appSelectActiveCard]',
})
export class SelectActiveCardDirective {
  @Input({ required: true }) currentOffer!: OfferPreview | null;
  @Output() activeCardSelected: EventEmitter<OfferPreview | null> =
    new EventEmitter<OfferPreview | null>();

  @HostListener('mouseenter', ['$event'])
  onMouseEnter() {
    if (this.currentOffer) {
      this.activeCardSelected.emit(this.currentOffer);
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave() {
    this.activeCardSelected.emit(null);
  }
}
