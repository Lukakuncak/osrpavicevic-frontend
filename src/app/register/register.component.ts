import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatPassword: new FormControl('', Validators.required)
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (!password || !repeatPassword) {
      return null;
    }

    return password.value === repeatPassword.value ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      const { firstname, lastname, username, password } = this.registrationForm.value;
      const userdata = { firstname, lastname, username, password };
      try {
        const response = await this.authService.register(userdata);
        if (response.statusCode === 200) {
          this.authService.login(username, password);
          this.router.navigate(['/pocetna'])
        } else {
          this.errorMessage = response.error
        }
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  }
}