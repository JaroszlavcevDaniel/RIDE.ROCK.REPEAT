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

replyingTo: string | null = null;
replyText = '';

topLevelComments: ArticleComment[] = [];
repliesMap: { [key: string]: ArticleComment[] } = {};

  @Input() articleId!: string;

  comments$!: Observable<ArticleComment[]>;
  user$!: Observable<any>;

  newComment = '';

  constructor(
    private auth: AuthService,
    private commentService: CommentService
  ) {}

  startReply(commentId: string) {
  this.replyingTo = commentId;
}

async submitReply(user: any) {
  if (!this.replyText.trim() || !this.replyingTo) return;

  await this.commentService.addComment(
    this.articleId,
    this.replyText,
    user,
    this.replyingTo
  );

  this.replyText = '';
  this.replyingTo = null;
}
  ngOnInit() {
    this.user$ = this.auth.user$;
    this.comments$ = this.commentService.getComments(this.articleId);
    this.comments$.subscribe(comments => {


  this.topLevelComments =
    comments.filter(c => !c.parentId);


  this.repliesMap = {};


  comments
    .filter(c => c.parentId)
    .forEach(reply => {

      if (!this.repliesMap[reply.parentId!]) {
        this.repliesMap[reply.parentId!] = [];
      }

      this.repliesMap[reply.parentId!].push(reply);
    });
});

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
