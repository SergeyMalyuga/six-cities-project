import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { Offer, OfferPreview } from '../../core/models/offers';
import { ActivatedRoute } from '@angular/router';
import { OfferApiService } from '../../core/services/offer-api.service';
import { Subject, takeUntil } from 'rxjs';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';
import { Comment } from '../../core/models/comments';
import { CommentApiService } from '../../core/services/comment-api.service';
import { CommentListComponent } from '../../features/comment-list/comment-list.component';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CommentFormComponent } from '../../features/comment-form/comment-form.component';
import { CardComponent } from '../../shared/card/card.component';
import { FirstOffersPipe } from './pipes/first-offers.pipe';
import { AuthorizationStatus } from '../../core/constants/const';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { selectAuthStatus } from '../../store/app/selectors/app.selectors';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    CapitalizePipe,
    CommentListComponent,
    LoaderComponent,
    CommentFormComponent,
    CardComponent,
    FirstOffersPipe,
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent {
  public offer: WritableSignal<Offer | undefined> = signal<Offer | undefined>(
    undefined,
  );
  public nearbyOffers: WritableSignal<OfferPreview[]> = signal<OfferPreview[]>(
    [],
  );
  public comments: WritableSignal<Comment[]> = signal<Comment[]>([]);
  public commentsCount: Signal<number> = computed(() => this.comments().length);
  public authStatus: WritableSignal<AuthorizationStatus> =
    signal<AuthorizationStatus>(AuthorizationStatus.UN_AUTH);

  public offerId: WritableSignal<string | null> = signal<string | null>(null);
  private activeRoute = inject(ActivatedRoute);
  private offerApiService: OfferApiService = inject(OfferApiService);
  private commentApiService: CommentApiService = inject(CommentApiService);
  private destroySubject: Subject<void> = new Subject<void>();
  private store: Store<AppState> = inject(Store<AppState>);

  constructor() {
    this.activeRoute.paramMap.subscribe((params) =>
      this.offerId.set(params.get('id')),
    );

    this.store
      .select(selectAuthStatus)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((status: AuthorizationStatus) => this.authStatus.set(status));

    effect(() => {
      const id = this.offerId();
      if (id) {
        this.offerApiService
          .getOfferById(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((offer: Offer) => this.offer.set(offer));
        this.offerApiService
          .getNearbyOffers(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((offers) => this.nearbyOffers.set(offers));
        this.commentApiService
          .getComments(id)
          .pipe(takeUntil(this.destroySubject))
          .subscribe((comments: Comment[]) => this.comments.set(comments));
      }
    });
  }

  public onCommentPosted(comment: Comment) {
    this.comments.update((comments) => [comment, ...comments]);
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
