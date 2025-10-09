import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appToggleFavoriteOffers]',
})
export class ToggleFavoriteOffersDirective {
  private elementRef: ElementRef = inject(ElementRef);

  @HostListener('click')
  handleToggleFavorite() {
    const buttonElement = this.elementRef.nativeElement as HTMLButtonElement;
    buttonElement.classList.toggle('place-card__bookmark-button--active');
  }
}
