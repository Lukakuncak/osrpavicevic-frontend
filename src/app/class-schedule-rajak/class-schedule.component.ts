import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-class-schedule',
  standalone: true,
  imports: [],
  templateUrl: './class-schedule.component.html',
  styleUrl: './class-schedule.component.css'
})
export class ClassScheduleComponentRajak implements OnInit {
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const url = 'https://raspored.rs/pub/?pid=hfpx&v=n'; 
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}