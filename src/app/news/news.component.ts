import { Component, OnInit } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { NewsPage, News } from '../model/news';
import { AuthService } from '../service/auth.service';
import { NewsService } from '../service/news.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsPage: NewsPage = {
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
    size: 0,
    content: [],
    number: 0,
    numberOfElements: 0,
    empty: true
  };
  isAdmin$: Observable<boolean> = this.authService.isAdmin();
  currentPage: number = 0;
  pageSize: number = 9;
  totalPages: number = 0;
  sortBy: string = 'dateTime';
  sortDir: string = 'desc';
  searchTerm: string = '';
  selectedType: string = '';
  newsTypes: string[] = [];

  constructor(private newsService: NewsService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadNews();
    this.loadNewsTypes();
  }

  loadNews(page: number = this.currentPage): void {
    this.newsService.getAllNews(page, this.pageSize, this.sortBy, this.sortDir).pipe(
      catchError(error => {
        console.error('Error fetching news', error);
        return of({
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
          size: 0,
          content: [],
          number: 0,
          numberOfElements: 0,
          empty: true
        });
      })
    ).subscribe(newsPage => {
      this.newsPage = newsPage;
      this.currentPage = newsPage.number;
      this.totalPages = newsPage.totalPages;
    });
  }

  loadNewsTypes(): void {
    this.newsService.getAllNewsTypes().subscribe(
      (types) => this.newsTypes = types,
      (error) => console.error('Error fetching news types', error)
    );
  }

  searchNews(): void {
    this.loadNews();
  }

  loadPreviousPage(): void {
    if (this.currentPage > 0) {
      this.loadNews(this.currentPage - 1);
    }
  }

  loadNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.loadNews(this.currentPage + 1);
    }
  }

  createNews(): void {
    this.router.navigate(['/kreiraj-obavestenje']);
  }

  sortNewsByDate(): void {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.loadNews();  // Reload news with new sorting direction
  }
}
