import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';
import { AuthorizationStatus } from '../../core/constants/const';

@Directive({
  selector: '[appToggleFavoriteOffers]',
})
export class ToggleFavoriteOfferDirective {
  @Input({ required: true }) authStatus!: AuthorizationStatus;
  @Input({ required: true }) isOfferPage!: boolean;
  @Output() favoriteOffersToggled: EventEmitter<boolean> =
    new EventEmitter<boolean>(false);
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('click')
  handleToggleFavorite() {
    if (this.authStatus === AuthorizationStatus.AUTH) {
      const buttonElement = this.elementRef.nativeElement as HTMLButtonElement;
      buttonElement.classList.toggle(this.getActiveClass());
    }
    this.favoriteOffersToggled.emit(true);
  }

  private getActiveClass() {
    return this.isOfferPage
      ? 'offer__bookmark-button--active'
      : 'place-card__bookmark-button--active';
  }
}
