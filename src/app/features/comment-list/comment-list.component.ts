import { Component, Input } from '@angular/core';
import { CommentItemComponent } from '../comment-item/comment-item.component';
import { Comment } from '../../core/models/comments';

@Component({
  selector: 'app-comment-list',
  imports: [CommentItemComponent],
  templateUrl: './comment-list.component.html',
})
export class CommentListComponent {
  @Input({ required: true }) comments!: Comment[];
}
