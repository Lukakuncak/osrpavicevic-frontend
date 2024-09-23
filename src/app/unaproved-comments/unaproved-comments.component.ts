import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment';
import { CommentService } from '../service/comment.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unaproved-comments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './unaproved-comments.component.html',
  styleUrl: './unaproved-comments.component.css'
})
export class UnaprovedCommentsComponent implements OnInit {
  comments: Comment[];
  token: string;

  constructor(private commentService: CommentService) { }


  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.loadUnapprovedComments();
  }


  loadUnapprovedComments() {
    this.commentService.getAllUnapproved(this.token).subscribe(response => this.comments = response);
  }

  async approveComment(id: number) {
    await this.commentService.approveComment(id, this.token);
    this.loadUnapprovedComments();
  }

  async deleteComment(id: number) {
    await this.commentService.deleteComment(id, this.token);
    this.loadUnapprovedComments();
  }
}
