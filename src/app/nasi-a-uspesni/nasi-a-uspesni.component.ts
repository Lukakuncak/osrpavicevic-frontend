import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../model/person';
import { PersonType } from '../model/person-type.enum';
import { AuthService } from '../service/auth.service';
import { PersonService } from '../service/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nasi-a-uspesni',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nasi-a-uspesni.component.html',
  styleUrl: './nasi-a-uspesni.component.css'
})
export class NasiAUspesniComponent implements OnInit {
  @ViewChild('top') top!: ElementRef; 
  personForm: FormGroup;
  personList: Person[] = [];
  selectedPerson: Person | null = null;
  type: PersonType = PersonType.NASI_A_USPESNI;
  token: string | null = null; 
  isAdmin: boolean = false;
  selectedFile: File | null = null; 


  director: Person | null = null;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.personForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      position: ['']
    });
  }


  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token'); 
    }
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin; 
    });
    this.fetchPersons(); 
  }

  async fetchPersons() {
    this.personList = await this.personService.getAllPersonType(this.type); 
  }




  async savePerson() {
    const formValue = this.personForm.value;
    if (this.selectedPerson) {
      await this.personService.editPerson(this.selectedPerson.id, this.type, formValue.firstname, formValue.lastname, formValue.position, this.token);
      this.snackBar.open('Успешно сте ажурирали особу ' + formValue.firstname + ' ' + formValue.lastname + '!', 'Затвори', {
        duration: 2000,
      });
      if (this.selectedFile) {
        await this.personService.addPictureForPerson(this.selectedPerson.id, this.selectedFile, this.token);
      }
    } else {
      const response = await this.personService.createPerson(this.type, formValue.firstname, formValue.lastname, formValue.position, this.token);
      this.snackBar.open('Успешно сте креирали особу ' + formValue.firstname + ' ' + formValue.lastname + '!', 'Затвори', {
        duration: 2000,
      });
      if (response.id >= 0) {
        await this.personService.addPictureForPerson(response.id, this.selectedFile, this.token);
      }
    }
    this.resetForm();
    this.fetchPersons(); 
  }

  editPerson(person: Person) {
    this.selectedPerson = person;
    this.personForm.patchValue({
      firstname: person.firstname,
      lastname: person.lastname,
      position: person.position
    });
    this.scrollToTop();
  }

  scrollToTop() {
    if (this.top) {
      this.top.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async deletePerson(person: Person) {
    if (confirm('Да ли сте сигурни да желите да уклоните особу?')) {
      await this.personService.delete(person.id, this.token);
      this.fetchPersons();
    }
  }

  resetForm() {
    this.personForm.reset();
    this.selectedPerson = null;
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.selectedFile = file;
  }

  async deletePicture(id: number) {
    await this.personService.deletePictureForPerson(id, this.token);
    this.resetForm();
    this.fetchPersons();
  }
}
