import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../model/comment';
import { NewsType } from '../news/news-type.enum';
import { CommentService } from '../service/comment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reply-to-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reply-to-comment.component.html',
  styleUrl: './reply-to-comment.component.css'
})
export class ReplyToCommentComponent implements OnInit {
  commentId: number;
  comment: Comment = {
    id:0,
    content: "",
    commentCreatedDate: '',
    reply: '',  
    replyCreatedDate: '',
    approved: false,
    user: {
      id:0,
      firstname: '',
      lastname: '',
      username: '',
      role: 'STANDARD'
    },
    news: {
      id: 0,
      title: "",
      content: "",
      type: NewsType.TAKMICENJA,
      dateTime: "9/20/24 00:00",
      clicks: 0,
      deleted: false,
      pinned: false
    }
  };

  token: string;

  constructor(private route: ActivatedRoute, private commentService: CommentService, private router: Router, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam) {
        this.commentId = +idParam;
        this.loadComment();
      }
    });
  }

  async loadComment() {
    this.comment = await this.commentService.getCommentById(this.commentId, this.token);
  }

  submitReply(): void {
    if (!this.comment.reply || this.comment.reply.trim() === '') {
      this.snackBar.open('Одговор мора имати садржај', 'Затвори', {
        duration: 3000,
      });
      return;
    }
  
    this.commentService.replyToComment(this.commentId, this.comment.reply, this.token)
      .then(() => {
        this.snackBar.open('Успешно сте одговорили на коментар!', 'Затвори', {
          duration: 3000,
        });
        this.router.navigate([`obavestenje/${this.comment.news.id}`])
      })
      .catch(error => {
        console.error('Грешка приликом остављања одговора:', error);
        this.snackBar.open('Одговор мора имати садржај', 'Затвори', {
          duration: 3000,
        });
      });
  }
  
  visitNews(id: number){
    this.router.navigate([`obavestenje/${id}`])
  }

}
