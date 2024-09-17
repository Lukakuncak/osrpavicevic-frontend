import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { NewsPage } from '../model/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:8080'; // Adjust this to your backend URL

  // Create a new news post (admin only)
  createNews(title: string, content: string, type: string, dateTime: string, token: string): Observable<any> {
    const newsCreateRequest = {
      title: title,
      content: content,
      type: type,
      dateTime: dateTime
    };
    return from(axios.post(`${this.baseUrl}/news/create`, newsCreateRequest, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    );
  }

  getAllNews(page: number = 0, size: number = 20, sortBy: string = 'dateTime', sortDir: string = 'desc'): Observable<NewsPage> {
    return from(
      axios.get(`${this.baseUrl}/public/news/get-all`, {
        params: {
          page: page.toString(),
          size: size.toString(),
          sortBy: sortBy,
          sortDir: sortDir
        }
      }).then(response => response.data.newsPage)
    );
  }

  getAllNewsByType(type: string, page: number = 0, size: number = 10, sortBy: string = 'dateTime', sortDir: string = 'desc'): Observable<NewsPage> {
    return from(
      axios.get(`${this.baseUrl}/public/news/get-all-by-type`, {
        params: {
          type: type,
          page: page.toString(),
          size: size.toString(),
          sortBy: sortBy,
          sortDir: sortDir
        }
      }).then(response => response.data.newsPage)
    );
  }
  getAllNewsTypes(): Observable<string[]> {
    return from(axios.get(`${this.baseUrl}/public/news/get-all-types`).then(response => response.data));
  }
}