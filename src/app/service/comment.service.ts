import { Injectable } from '@angular/core';
import { Comment } from '../model/comment';
import axios from 'axios';
import { from, Observable, throwIfEmpty } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private BASE_URL = "http://localhost:8080/comment";
  private emptyComment: Comment = {
    id: 0,
    content: '',
    commentCreatedDate: '',
    approved: false,
    user: null
  }
  constructor(private snackBar: MatSnackBar) { }

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
        console.error("Error while creating comment: ", response.data.error);
        return this.emptyComment;
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      return this.emptyComment;
    }
  }

  getAllUnapproved(token: string): Observable<Comment[]> {
    return from(
      axios.get(`${this.BASE_URL}/get-all-unapproved`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(response => {
        if (response.data.statusCode === 200) {
          return response.data.comments;
        } else {
          console.error("Error while fetching unapproved comments:", response.data.error);
          return [];
        }
      }).catch(error => {
        console.error("Error while fetching unapproved comments:", error);
        return [];
      })
    );
  }
  async deleteComment(id: number, token: string) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/delete-comment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.statusCode === 200) {
        this.snackBar.open('Успешно обрисан коментар', 'Затвори', {
          duration: 3000,
        });
      } else {
        console.log("Error while deleting comments: ", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

  async approveComment(id: number, token: string) {
    try {
      const response = await axios.put(`${this.BASE_URL}/approve-comment/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.statusCode !== 200) {
        console.log("Error while approving comments: ", response.data.error);
      }
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  }

  async getCommentById(id: number, token: string) {
    try {
      const response = await axios.get(`${this.BASE_URL}/get-comment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.statusCode === 200) {
        return response.data.comment;
      } else {
        console.log('Error while fetching comment with id ' + id);
      }
    } catch (error) {
      console.error("Error fetching comment:", error);
    }
  }

  async replyToComment(id: number, reply: string, token: string){
    try {
      const response = await axios.post(`${this.BASE_URL}/reply-to-comment/${id}`, reply, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if (response.data.statusCode === 200) {
        this.snackBar.open('Successfully replied to the comment', 'Close', {
          duration: 3000,
        });
      } else {
        console.error('Error while replying to comment:', response.data.error);
        this.snackBar.open('Failed to reply to the comment', 'Close', {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error replying to comment:', error);
      this.snackBar.open('Error occurred while replying to the comment', 'Close', {
        duration: 3000,
      });
    }
  }
  
}

