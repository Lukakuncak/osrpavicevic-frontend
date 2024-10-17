import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { PostService } from '../service/post.service';
import { Post } from '../model/post';
import { PostType } from '../model/post-type.enum';
import { NewlineToBrPipe } from '../newline-to-br.pipe';
import { FilesService } from '../service/files.service';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [CommonModule, FormsModule, NewlineToBrPipe],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css'
})
export class SinglePostComponent implements OnInit {
  selectedFile: File | null = null;
  newsId!: number;
  post: Post = {
    id: 0,
    title: "",
    content: "",
    type: PostType.RODITELJI,
    dateTime: "9/20/24 00:00",
    deleted: false,
  };
  isAdmin: boolean = false;
  private token: string;
  isEditing: boolean = false; 
  selectedImage?: File; 

  constructor(private route: ActivatedRoute, private postService: PostService, private authService: AuthService,
    private pdfService: FilesService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      if (idParam) {
        this.newsId = +idParam;
      }
      this.loadNews();
    });
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  async loadNews() {
    try {
      const post = await this.postService.getSinglePost(this.newsId);
      this.post = post;
    } catch (error) {
      console.error('Error fetching news with comments: ', error);
    }
  }

  loadPostWithPost(post:Post){
      this.post = post;
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
      var post = await this.postService.updatePostContent(this.newsId, this.post.content, this.token);
      this.snackBar.open('Успешно сте изменили садржај објаве.', 'Затвори', {
        duration: 3000,
      });

      
      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('multipartFile', this.selectedImage);

        post = await this.postService.uploadNewsImage(this.newsId, formData, this.token);
        this.snackBar.open('Успешно сте изменили слику објаве.', 'Затвори', {
          duration: 3000,
        });
      }
      if(this.selectedFile){
          this.postService.uploadFile(this.post.id, this.selectedFile,this.token).then(() => {
            this.loadNews();
            this.selectedFile = null;
            this.isEditing = false;
          });
        
      } else {
        this.isEditing = false; 
        this.loadPostWithPost(post); 
      }
    } catch (error) {
      console.error('Error saving changes: ', error);
      this.snackBar.open('Дошло је до грешке при чувању измена.', 'Затвори', {
        duration: 3000,
      });
    }
  }

  async deletePicture(){
    const news = await this.postService.deletePicture(this.newsId,this.token);
    this.loadPostWithPost(news);
  }

  downloadFile() {
    this.postService.downloadFile(this.post.id,this.post.title);
  }

  deleteFile() {
    if (confirm(`Да ли сте сигурни да желите да обришете фајл за објаву ${this.post.title}?`)) {
      this.postService.deleteFile(this.post.id,this.token).then(() => {
        this.loadNews();
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}
