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

  getAllNews(page: number, size: number, sortBy: string, sortDir: string, searchTerm: string): Observable<NewsPage> {
    return from(
      axios.get(`${this.baseUrl}/public/news/get-all`, {
        params: {
          page: page.toString(),
          size: size.toString(),
          search: searchTerm,
          sortBy: sortBy,
          sortDir: sortDir
        }
      }).then(response => response.data.newsPage)
    );
  }

  getAllNewsByType(type: string, page: number, size: number, sortBy: string, sortDir: string, searchTerm: string): Observable<NewsPage> {
    return from(
      axios.get(`${this.baseUrl}/public/news/get-all-by-type`, {
        params: {
          type: type,
          search: searchTerm,
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