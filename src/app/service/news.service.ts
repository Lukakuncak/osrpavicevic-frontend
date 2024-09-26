import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { News, NewsPage } from '../model/news';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseUrl = 'http://localhost:8080';

  createNews(title: string, content: string, type: string, token: string): Observable<any> {
    const newsCreateRequest = {
      title: title,
      content: content,
      type: type
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

  getAllPinnedNews():Observable<News[]>{
    return from(
      axios.get(`${this.baseUrl}/public/news/get-all-pinned`).then(response => response.data.newsList)
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

  getNewsWithComment(id: number): Promise<News> {
    return axios.get(`${this.baseUrl}/public/news/${id}`)
      .then(response => {
        if (response.status === 200) {
          return response.data.news;
        } else {
          console.error(response.data.error);
          throw new Error(response.data.error);
        }
      })
      .catch(error => {
        console.error("Happened an error during the news fetching: ", error);
        throw error;
      });
  }
  

  updateClickCounter(id:number){
    axios.put(`${this.baseUrl}/public/news/update-click/${id}`)
    .catch(error=> console.error("Error happened while updating click count",error));
  }

  async togglePin(id: number, token:string){
    
      await axios.put(`${this.baseUrl}/news/pin-unpin-news/${id}`, {},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  async deleteNews(id:number,token:string){
    await axios.put(`${this.baseUrl}/news/delete/${id}`, {},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}