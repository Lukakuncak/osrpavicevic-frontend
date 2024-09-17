import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-class-schedule-pilica',
  standalone: true,
  imports: [],
  templateUrl: './class-schedule-pilica.component.html',
  styleUrl: './class-schedule-pilica.component.css'
})
export class ClassSchedulePilicaComponent implements OnInit {
  safeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const url = 'https://raspored.rs/pub/?pid=2g8g'; 
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}