import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer, OfferPreview } from '../models/offers';
import { APIRoute, BASE_URL } from '../constants/const';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferApiService {
  private http: HttpClient = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.FAVORITE}`);
  }

  public changeStatus(offerId: string, status: number): Observable<Offer> {
    return this.http.post<Offer>(
      `${BASE_URL}/${APIRoute.FAVORITE}/${offerId}/${status}`,
      {},
    );
  }
}
