import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../service/news.service';
import { News } from '../model/news';
import { Comment } from '../model/comment';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { NewsType } from '../news/news-type.enum';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../service/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-one-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css']
})
export class OneNewsComponent implements OnInit {
  newsId!: number;
  news: News = {
    id: 0,
    title: "",
    content: "",
    type: NewsType.TAKMICENJA,
    dateTime: "9/20/24 00:00",
    clicks: 0,
    deleted: false,
    pinned: false
  };
  comments?: Comment[] = [];
  unapprovedComments?: Comment[] = [];
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  newComment: string = '';
  private token: string;
  private userId: number;
  isEditing: boolean = false; 
  selectedImage?: File; 

  constructor(private route: ActivatedRoute, private newsService: NewsService, private authService: AuthService, private commentService: CommentService,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam) {
        this.newsId = +idParam;
      }
      this.loadNews();
    });
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.userId = Number(localStorage.getItem('id'));
    }
  }

  async loadNews() {
    try {
      const news = await this.newsService.getNewsWithComment(this.newsId);
      this.news = news;
      const tempComments = news?.comments as unknown as Comment[] || [];
      this.comments = tempComments.filter(item => item.approved);
      this.unapprovedComments = tempComments.filter(item => !item.approved);
    } catch (error) {
      console.error('Error fetching news with comments: ', error);
    }
  }

  loadNewsWithNews(news:News){
      this.news = news;
      const tempComments = news?.comments as unknown as Comment[] || [];
      this.comments = tempComments.filter(item => item.approved);
      this.unapprovedComments = tempComments.filter(item => !item.approved);
  }

  submitComment(): void {
    if (this.newComment.trim()) {
      this.commentService.createComment(this.userId, this.newsId, this.newComment, this.token);
      this.snackBar.open('Успешно сте послали коментар, чека се одобрење администратора.', 'Затвори', {
        duration: 3000,
      });
      this.loadNews();
      this.newComment = '';
    } else {
      console.error('Comment is empty');
    }
  }

  async approveComment(id: number) {
    await this.commentService.approveComment(id, this.token);
    this.loadNews();
  }

  async deleteComment(id: number) {
    await this.commentService.deleteComment(id, this.token);
    this.loadNews();
  }

  async replyToComment(id: number) {
    this.router.navigate([`odgovori-na-komentar/${id}`]);
  }

  
  enableEdit() {
    this.isEditing = true;
  }

  
  onImageSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedImage = target.files[0];
    }
  }

  
  async saveChanges() {
    try {
      var news = await this.newsService.updateNewsContent(this.newsId, this.news.content, this.token);
      this.snackBar.open('Успешно сте изменили садржај вести.', 'Затвори', {
        duration: 3000,
      });

      
      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('multipartFile', this.selectedImage);

        news = await this.newsService.uploadNewsImage(this.newsId, formData, this.token);
        this.snackBar.open('Успешно сте изменили слику вести.', 'Затвори', {
          duration: 3000,
        });
      }

      this.isEditing = false; 
      this.loadNewsWithNews(news); 
    } catch (error) {
      console.error('Error saving changes: ', error);
      this.snackBar.open('Дошло је до грешке при чувању измена.', 'Затвори', {
        duration: 3000,
      });
    }
  }

  async deletePicture(){
    const news = await this.newsService.deletePicture(this.newsId,this.token);
    this.loadNewsWithNews(news);
  }
}
