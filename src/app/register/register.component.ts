import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const repeatPassword = form.get('repeatPassword');
    if (password && repeatPassword && password.value !== repeatPassword.value) {
      repeatPassword.setErrors({ passwordMismatch: true });
    } else {
      repeatPassword.setErrors(null);
    }
    return null;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Handle form submission
      console.log('Form Submitted', this.registrationForm.value);
    }
  }
}