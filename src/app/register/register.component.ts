import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      isStudent: [false],
      grade: [{ value: '', disabled: true }, [Validators.required, Validators.min(1), Validators.max(8)]]
    });

    this.registrationForm.get('isStudent')?.valueChanges.subscribe(isStudent => {
      const gradeControl = this.registrationForm.get('grade');
      if (isStudent) {
        gradeControl?.enable();
      } else {
        gradeControl?.disable();
      }
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
  }
}