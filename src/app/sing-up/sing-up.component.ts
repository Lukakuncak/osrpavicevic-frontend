import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SignUpComponent {
  token: string;
  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder,private readonly authService: AuthService, private router:Router, private notificationService: NotificationService
  ) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      const { username, password } = this.signUpForm.value;
      try {
        const response = await this.authService.login(username, password);
        if(response.statusCode === 200){
          this.token = response.token;
          await this.loadNotification();
          this.router.navigate(['/pocetna']);
        } else {
          this.errorMessage = response.error
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  }

  async loadNotification(){
    await this.notificationService.getNotificationWithComments(this.token);
  }
}