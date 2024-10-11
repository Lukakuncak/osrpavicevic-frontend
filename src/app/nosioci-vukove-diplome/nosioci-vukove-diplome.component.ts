import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../model/person';
import { PersonType } from '../model/person-type.enum';
import { AuthService } from '../service/auth.service';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-nosioci-vukove-diplome',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nosioci-vukove-diplome.component.html',
  styleUrl: './nosioci-vukove-diplome.component.css'
})
export class NosiociVukoveDiplomeComponent implements OnInit {
  @ViewChild('top') top!: ElementRef; 
  personForm: FormGroup;
  personList: Person[] = [];
  selectedPerson: Person | null = null;
  groupedPersons: { [year: string]: Person[] } = {}; // Grouped persons by year
  type: PersonType = PersonType.NOSIOCI_VUKOVE_DIPLOME;
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
      this.token = localStorage.getItem('token'); // Retrieve token from local storage
    }
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin; // Set if the user is an admin
    });
    this.fetchPersons(); // Fetch the list of persons on component initialization
  }

  async fetchPersons() {
    this.personList = await this.personService.getAllPersonType(this.type); // Get persons based on type
    this.groupPersonsByYear(); // Group persons by year after fetching
  }

  groupPersonsByYear() {
    // Group persons by the year (stored in the position field)
    this.groupedPersons = this.personList.reduce((acc: { [key: string]: Person[] }, person: Person) => {
      const year = person.position || 'N/A'; // Default to 'N/A' if year is missing
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(person);
      return acc;
    }, {});
  }

  // Sorting function to sort years in descending order
  descOrder = (a: { key: string }, b: { key: string }): number => {
    return b.key.localeCompare(a.key);
  };

  // Save the new or edited person
  async savePerson() {
    const formValue = this.personForm.value;
    if (this.selectedPerson) {
      // Edit existing person
      await this.personService.editPerson(this.selectedPerson.id, this.type, formValue.firstname, formValue.lastname, formValue.position, this.token);
      this.snackBar.open('Успешно сте ажурирали особу ' + formValue.firstname + ' ' + formValue.lastname + '!', 'Затвори', {
        duration: 2000,
      });
      if (this.selectedFile) {
        await this.personService.addPictureForPerson(this.selectedPerson.id, this.selectedFile, this.token);
      }
    } else {
      // Create new person
      const response = await this.personService.createPerson(this.type, formValue.firstname, formValue.lastname, formValue.position, this.token);
      this.snackBar.open('Успешно сте креирали особу ' + formValue.firstname + ' ' + formValue.lastname + '!', 'Затвори', {
        duration: 2000,
      });
      if (response.id >= 0) {
        await this.personService.addPictureForPerson(response.id, this.selectedFile, this.token);
      }
    }
    this.resetForm();
    this.fetchPersons(); // Refresh the list of persons
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
