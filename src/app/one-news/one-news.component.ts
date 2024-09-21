import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../service/news.service';
import { News } from '../model/news';
import { Comment } from '../model/comment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { NewsType } from '../news/news-type.enum';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../service/comment.service';

@Component({
  selector: 'app-one-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css']
})
export class OneNewsComponent implements OnInit {
  newsId!: number;
  news: News = {
    id: 0,
    title: "",
    content: "",
    type: NewsType.TAKMICENJA,
    dateTime: "9/20/24 00:00",
    clicks: 0,
    deleted: false,
    pinned: false
  };
  comments?: Comment[] = [];
  isAuthenticated: boolean = false;
  newComment: string = '';
  private token: string;
  private userId: number;


  constructor(private route: ActivatedRoute, private newsService: NewsService, private authService: AuthService, private commentService: CommentService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam) {
        this.newsId = +idParam;
      }
      this.loadNews();
    });
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.userId = Number(localStorage.getItem('id'));
    }
  }

  async loadNews() {
    try {
      const news = await this.newsService.getNewsWithComment(this.newsId);
      this.news = news;
      const tempComments = news?.comments as unknown as Comment[] || [];
      this.comments = tempComments.filter(item => item.approved);
    } catch (error) {
      console.error('Error fetching news with comments: ', error);
    }
  }

  submitComment(): void {
    if (this.newComment.trim()) {
      this.commentService.createComment(this.userId,this.newsId,this.newComment,this.token);
      alert('New Comment Submitted:');
      this.loadNews();
      this.newComment = '';
    } else {
      console.error('Comment is empty');
    }
  }
}
