import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommentApiService } from '../../core/services/comment-api.service';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from '../../core/models/comments';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input({ required: true }) commentId!: string | null;
  @Output() commentPosted: EventEmitter<Comment> = new EventEmitter<Comment>();

  private fb: FormBuilder = inject(FormBuilder);
  private commentApiService = inject(CommentApiService);
  private destroySubject: Subject<void> = new Subject<void>();

  public commentForm: FormGroup = this.fb.group({
    rating: ['', Validators.required],
    comment: ['', [Validators.required, Validators.min(50)]],
  });

  public onSubmit() {
    if (this.commentForm.valid && this.commentId) {
      const { rating, comment } = this.commentForm.value;
      this.commentApiService
        .postComment(this.commentId, comment, rating)
        .pipe(takeUntil(this.destroySubject))
        .subscribe({
          next: (comment: Comment) => this.commentPosted.emit(comment),
          complete: () => this.commentForm.reset(),
        });
    }
  }
}
