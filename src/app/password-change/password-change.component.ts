import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.css'
})
export class PasswordChangeComponent implements OnInit {
  passwordChangeForm: FormGroup;
  passwordsMismatch: boolean = false;
  token: string;

  constructor(private fb: FormBuilder, private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.passwordChangeForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  get f() {
    return this.passwordChangeForm.controls;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const { newPassword, confirmNewPassword } = formGroup.controls;
    if (newPassword.value !== confirmNewPassword.value) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.passwordChangeForm.invalid) {
      return;
    }

    const { oldPassword, newPassword } = this.passwordChangeForm.value;

    this.userService.changePassword(oldPassword, newPassword,this.token).subscribe({
      next: () => {
        alert('Lozinka uspeno promenjena.');
        this.router.navigate(['/pocetna'])
      },
      error: (err) => {
        alert('Neuspesna promena lozinke, proverite da li ste dobro uneli staru lozinku');
      }
    });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.f[controlName];
    return control.invalid && (control.dirty || control.touched);
  }
}