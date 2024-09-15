import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SignUpComponent {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private fb: FormBuilder,private readonly authService: AuthService, private router:Router) {
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
          this.authService.saveToLocalStorageAndUpdateFlags(response.token, response.role)
          this.router.navigate(['/pocetna'])
        } else {
          this.errorMessage = response.error
        }
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  }
}