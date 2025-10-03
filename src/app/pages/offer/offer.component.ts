import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
  WritableSignal
} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';
import {Offer} from '../../core/models/offers';
import {ActivatedRoute} from '@angular/router';
import {OfferApiService} from '../../core/services/offer-api.service';
import {Subject, takeUntil} from 'rxjs';
import {CapitalizePipe} from '../../shared/pipes/capitalize.pipe';
import {Comment} from '../../core/models/comments';
import {CommentApiService} from '../../core/services/comment-api.service';
import {CommentListComponent} from '../../features/comment-list/comment-list.component';
import {LoaderComponent} from '../../shared/loader/loader.component';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    CapitalizePipe,
    CommentListComponent,
    LoaderComponent
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent {
  public offer: WritableSignal<Offer | undefined> = signal<Offer | undefined>(undefined);
  public comments: WritableSignal<Comment[]> = signal<Comment[]>([]);
  public commentsCount: Signal<number> = computed(() => this.comments().length);

  private offerId: WritableSignal<string | null> = signal<string | null>(null);
  private activeRoute = inject(ActivatedRoute);
  private offerApiService: OfferApiService = inject(OfferApiService);
  private commentApiService: CommentApiService = inject(CommentApiService);
  private destroySubject: Subject<void> = new Subject<void>();

  constructor() {
    this.activeRoute.paramMap.subscribe(params => this.offerId.set(params.get('id')));
    effect(() => {
      const id = this.offerId();
      if (id) {
        this.offerApiService.getOfferById(id).pipe(takeUntil(this.destroySubject)).subscribe((offer: Offer) => this.offer.set(offer))
        this.commentApiService.getComments(id).pipe(takeUntil(this.destroySubject)).subscribe((comments: Comment[]) => this.comments.set(comments));
      }
    })
  }
}
