import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PersonType } from '../model/person-type.enum';
import { PersonService } from '../service/person.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Person } from '../model/person';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { response } from 'express';

@Component({
  selector: 'app-zaposleni',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit {
  @ViewChild('top') top!: ElementRef; 
  personForm: FormGroup;
  personList: Person[] = [];
  professors: Person[] = [];
  nonProfessors: Person[] = [];
  selectedPerson: Person | null = null;
  type: PersonType = PersonType.ZAPOSLENI;
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
      const reponse = await this.personService.createPerson(this.type, formValue.firstname, formValue.lastname, formValue.position, this.token);
      this.snackBar.open('Успешно сте креирали особу ' + formValue.firstname + ' ' + formValue.lastname + '!', 'Затвори', {
        duration: 2000,
      });
      if (reponse.id >= 0) {
        await this.personService.addPictureForPerson(reponse.id, this.selectedFile, this.token);
      }
    }
    this.resetForm();
    this.fetchPersons();
  }

  async fetchPersons() {
    this.personList = await this.personService.getAllPersonType(this.type);
    this.separatePersons();
  }

  separatePersons() {
    this.director = this.personList.find(person => person.position?.startsWith('директор')) || null;

    this.professors = this.personList.filter(person => person.position?.startsWith('професор') || person.position?.startsWith('наставник'));
    this.nonProfessors = this.personList.filter(person => !person.position?.startsWith('професор') && !person.position?.startsWith('наставник') && !person.position?.startsWith('директор'));
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
