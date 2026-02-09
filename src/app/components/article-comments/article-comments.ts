import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { CommentService } from '../../services/comment-service';
import { ArticleComment } from '../../models/user.model';

@Component({
  selector: 'app-article-comments',
  standalone: false,
  templateUrl: './article-comments.html',
  styleUrl: './article-comments.css',
})
export class ArticleComments implements OnInit {

  @Input() articleId!: string;

  comments$!: Observable<ArticleComment[]>;
  user$!: Observable<any>;

  newComment = '';

  constructor(
    private auth: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit() {
    this.user$ = this.auth.user$;
    this.comments$ = this.commentService.getComments(this.articleId);
  }

  async submitComment(user: any) {
    if (!this.newComment.trim()) return;

    await this.commentService.addComment(
      this.articleId,
      this.newComment,
      user
    );

    this.newComment = '';
  }
}
