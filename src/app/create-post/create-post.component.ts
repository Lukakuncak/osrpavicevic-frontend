import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { NewsService } from '../service/news.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  newsForm: FormGroup;
  isAdmin$ = this.authService.isAdmin();
  newsTypes: string[] = [];
  token: string;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private authService: AuthService
  ) {
    this.newsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.loadNewsTypes();
  }

  loadNewsTypes(): void {
    this.postService.getAllPostTypes().subscribe(
      (types: string[]) => {
        this.newsTypes = types;
      },
      error => {
        console.error('Error fetching news types', error);
      }
    );
  }

  createNews(): void {
    if (this.newsForm.valid) {
      const { title, content, type} = this.newsForm.value;
      this.postService.createPost(title, content, type, this.token).subscribe(
        response => {
          console.log('News created successfully', response);
          this.newsForm.reset();
        },
        error => {
          console.error('Error creating news', error);
        }
      );

    } else {
      console.log('Form is invalid');
    }
  }
}