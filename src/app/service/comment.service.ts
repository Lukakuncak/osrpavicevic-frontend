import { Injectable } from '@angular/core';
import { Comment } from '../model/comment';
import axios from 'axios';
import { throwIfEmpty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private BASE_URL = "http://localhost:8080/comment";
  private emptyComment : Comment = {
      id: 0,
      content: '',
      commentCreatedDate: '',
      approved: false,
      user: null
  }
  constructor() { }

  async createComment(userId: number, newsId: number, content: string, token: string): Promise<Comment> {
    try {
      const response = await axios.post(`${this.BASE_URL}/create`, {
        userId,
        newsId,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.statusCode === 200) {
        return response.data.comment;
      } else {
        console.error("Error while creating comment: ",response.data.error);
        return this.emptyComment;
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      return this.emptyComment;
    }
  }

  async getAllUnaproved(token: string):Promise<Comment[]>{
    try{
      const response =  await axios.get(`${this.BASE_URL}/get-all-unapproved`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.data.statusCode === 200){
        return response.data.comments;
      } else {
        console.log("Error while fetching unapproved comments: ",response.data.error);
        return [];
      }
    }catch (error) {
      console.error("Error creating comment:", error);
      return [];
    }
  }
}

