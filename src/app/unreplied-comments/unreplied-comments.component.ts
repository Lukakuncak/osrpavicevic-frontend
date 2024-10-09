import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment';
import { CommentService } from '../service/comment.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unreplied-comments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './unreplied-comments.component.html',
  styleUrl: './unreplied-comments.component.css'
})
export class UnrepliedCommentsComponent implements OnInit {
  comments: Comment[];
  token: string;

  constructor(private commentService: CommentService,private router: Router) { }


  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.loadUnapprovedComments();
  }


  loadUnapprovedComments() {
    this.commentService.getAllUnreplied(this.token).subscribe(response => this.comments = response);
  }

  async approveComment(id: number) {
    await this.commentService.approveComment(id, this.token);
    this.loadUnapprovedComments();
  }

  async deleteComment(id: number) {
    await this.commentService.deleteComment(id, this.token);
    this.loadUnapprovedComments();
  }

  replyToComment(id: number){
    this.router.navigate([`odgovori-na-komentar/${id}`])
  }
}
