import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { NewsService } from '../service/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-news',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.css'
})
export class CreateNewsComponent implements OnInit {
  newsForm: FormGroup;
  isAdmin$ = this.authService.isAdmin();
  newsTypes: string[] = [];
  token: string;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
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
    this.newsService.getAllNewsTypes().subscribe(
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
      this.newsService.createNews(title, content, type, this.token).subscribe(
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