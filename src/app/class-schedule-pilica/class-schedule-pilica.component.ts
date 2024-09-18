import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ClassScheduleService } from '../service/class-schedule.service';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-class-schedule-pilica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-schedule-pilica.component.html',
  styleUrl: './class-schedule-pilica.component.css'
})
export class ClassSchedulePilicaComponent implements OnInit {
  safeUrl: SafeResourceUrl;
  isAdmin: boolean;
  token: string;
  newUrl: string;

  constructor(private sanitizer: DomSanitizer, private classScheduleService: ClassScheduleService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    const url = 'https://raspored.rs';
    if (this.classScheduleService.getPilicaUrl() !== "") {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.classScheduleService.getPilicaUrl())
    } else {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  updateUrl(): void {
    if (this.newUrl) {
      this.classScheduleService.setPilicaUrl(this.newUrl, this.token);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.newUrl);
    }
  }
}