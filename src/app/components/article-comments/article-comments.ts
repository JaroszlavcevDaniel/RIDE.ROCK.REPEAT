import {
  Component,
  Inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../services/auth-service';
import { CommentService } from '../../services/comment-service';
import { ArticleComment } from '../../models/user.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-article-comments',
  standalone: false,
  templateUrl: './article-comments.html',
  styleUrl: './article-comments.css',
})
export class ArticleComments implements OnChanges {

  @Input() articleId!: string;

  user$!: Observable<any>;


  comments$!: Observable<ArticleComment[]>;


  structuredComments$!: Observable<{
    topLevel: ArticleComment[];
    repliesMap: { [key: string]: ArticleComment[] };
  }>;

  newComment = '';
  replyingTo: string | null = null;
  replyText = '';

   isBrowser = false;

  constructor(
    private auth: AuthService,
    private commentService: CommentService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.user$ = this.auth.user$;
    
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['articleId'] && this.articleId) {
      this.loadComments();
    }
  }

  private loadComments() {

    this.comments$ =
      this.commentService.getComments(this.articleId);

   
    this.structuredComments$ = this.comments$.pipe(
      map(comments => {

        const topLevel =
          comments.filter(c => !c.parentId);

        const repliesMap: { [key: string]: ArticleComment[] } = {};

        comments
          .filter(c => c.parentId)
          .forEach(reply => {

            if (!repliesMap[reply.parentId!]) {
              repliesMap[reply.parentId!] = [];
            }

            repliesMap[reply.parentId!].push(reply);
          });

        return { topLevel, repliesMap };
      })
    );
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
}
