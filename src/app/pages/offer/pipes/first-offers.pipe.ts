import { Pipe, PipeTransform } from '@angular/core';
import { OfferPreview } from '../../../core/models/offers';

@Pipe({
  name: 'firstOffers',
})
export class FirstOffersPipe implements PipeTransform {
  transform(value: OfferPreview[]) {
    return value.slice(0, 3);
  }
}
