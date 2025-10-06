import { Component, Input } from '@angular/core';
import { Comment } from '../../core/models/comments';
import { FormatDatePipe } from './pipes/format-date.pipe';

@Component({
  selector: 'app-comment-item',
  imports: [FormatDatePipe],
  templateUrl: './comment-item.component.html',
})
export class CommentItemComponent {
  @Input({ required: true }) comment!: Comment;
  protected readonly Math = Math;
}
