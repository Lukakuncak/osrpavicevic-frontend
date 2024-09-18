import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';
import { ClassScheduleService } from '../service/class-schedule.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-schedule',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './class-schedule.component.html',
  styleUrl: './class-schedule.component.css'
})
export class ClassScheduleComponentRajak implements OnInit {
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
    if (this.classScheduleService.getRajakUrl() !== "") {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.classScheduleService.getRajakUrl())
    } else {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  updateUrl(): void {
    if (this.newUrl) {
      this.classScheduleService.setRajakUrl(this.newUrl, this.token);
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.newUrl);
    }
  }
}