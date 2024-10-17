import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/post.service';
import { PostPage, Post } from '../model/post';

@Component({
  selector: 'app-pedagoski-kutak-ucenici',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pedagoski-kutak-ucenici.component.html',
  styleUrl: './pedagoski-kutak-ucenici.component.css'
})
export class PedagoskiKutakUceniciComponent implements OnInit {
  postPage: PostPage = {
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
  isAdmin: boolean
  currentPage: number = 0;
  pageSize: number = 8;
  pageSizes: number[] = [8, 16, 32, 64];
  sortBy: string = 'dateTime';
  sortDir: string = 'desc';
  searchTerm: string = '';
  allPosts: Post[] = [];
  token: string

  constructor(private postService: PostService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    this.loadNews();
  }

  loadNews(): void {
      this.postService.getAllUceniciPosts( this.currentPage, this.pageSize, this.sortBy, this.sortDir, this.searchTerm).subscribe(postPage => {
        this.postPage = postPage;
        if (this.postPage) {
          this.currentPage = this.postPage.number;
        }
        if (this.postPage.content) {
          this.allPosts = this.postPage.content;
        }
      });
    } 
  

  searchNews(): void {
    this.currentPage = 0;
    this.loadNews();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.postPage.totalPages) {
      this.currentPage = page;
      this.loadNews();
    }
  }

  getPagesArray(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i);
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


  async deleteNews(id: number){
    if (confirm(`Да ли сте сигурни да желите да обришете пост?`)) {
      await this.postService.deletePost(id, this.token);
      this.loadNews();
    }
  }

  goToPost(id: number): void {
    this.router.navigate([`objava/${id}`])
  }
}
