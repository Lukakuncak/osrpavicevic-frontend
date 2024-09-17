import { Component, OnInit } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { NewsPage, News } from '../model/news';
import { AuthService } from '../service/auth.service';
import { NewsService } from '../service/news.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsType } from './news-type.enum';

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
  pageSizes: number[] = [9, 18, 36, 72];
  totalPages: number = 0;
  sortBy: string = 'dateTime';
  sortDir: string = 'desc';
  searchTerm: string = '';
  selectedType: string = '';
  newsTypes: string[] = [];
  mappedNewsTypes: string[] = [];

  constructor(private newsService: NewsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadNews();
    this.loadNewsTypes();
  }

  loadNews(): void {
    if (this.selectedType !== "") {
      this.newsService.getAllNewsByType(this.selectedType, this.currentPage, this.pageSize, this.sortBy, this.sortDir, this.searchTerm).subscribe(newsPage => {
        this.newsPage = newsPage;
        if (this.newsPage) {
          this.currentPage = this.newsPage.number;
        }
      });
    } else {
      this.newsService.getAllNews(this.currentPage, this.pageSize, this.sortBy, this.sortDir, this.searchTerm).subscribe(newsPage => {
        this.newsPage = newsPage;
        if (this.newsPage) {
          this.currentPage = this.newsPage.number;
        }
      });
    }
  }

  searchNews(): void {
    this.currentPage = 0;
    this.loadNews();
  }

  changePage(page: number): void {
    console.log(this.newsPage)
    console.log(page)
    if (page >= 0 && page < this.newsPage.totalPages) {
      this.currentPage = page;
      this.loadNews();
    }
  }

  updatePageSize(event: any): void {
    this.pageSize = +event.target.value;
    this.currentPage = 0;
    this.loadNews();
  }

  sortNewsByDate(): void {
    this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    this.loadNews();
  }

  loadNewsTypes(): void {
    this.newsService.getAllNewsTypes().subscribe(
      (types) => {
        this.newsTypes = types;
        this.mappedNewsTypes = this.mapNewsTypes(types);
      },
      (error) => console.error('Error fetching news types', error)
    );
  }

  private mapNewsTypes(types: string[]): string[] {
    return types.map(type => {
      switch (type) {
        case 'TAKMICENJA':
          return NewsType.TAKMICENJA;
        case 'VESTI':
          return NewsType.VESTI;
        case 'UPIS':
          return NewsType.UPIS;
        case 'ZAVRSNI_ISPIT':
          return NewsType.ZAVRSNI_ISPIT;
        default:
          return 'Unknown';
      }
    });
  }

  cyrilicToLatin(type: string): string {
    switch (type) {
      case NewsType.TAKMICENJA:
        return 'TAKMICENJA';
      case NewsType.VESTI:
        return 'VESTI';
      case NewsType.UPIS:
        return 'UPIS';
      case NewsType.ZAVRSNI_ISPIT:
        return 'ZAVRSNI_ISPIT';
      default:
        return 'Unknown';
    }
  }
}
