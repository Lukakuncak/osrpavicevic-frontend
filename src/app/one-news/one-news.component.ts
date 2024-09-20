import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../service/news.service';
import { News } from '../model/news';
import { Comment } from '../model/comment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css']
})
export class OneNewsComponent implements OnInit {
  id!: number;
  news!: News; // Use definite assignment operator
  comments: Comment[]; // Use definite assignment operator

  constructor(private route: ActivatedRoute, private newsService: NewsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
      }
      this.newsService.getNewsWithComment(this.id).subscribe(news => {
        this.news = news;
        this.comments = (news.comments as unknown) as Comment[] || [];

      });
    });
  }
}
