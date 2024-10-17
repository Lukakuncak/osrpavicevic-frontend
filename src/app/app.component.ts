import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { FooterComponentComponent } from './footer-component/footer-component.component';
import { ClassScheduleService } from './service/class-schedule.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
     CommonModule, 
     RouterLink, 
     RouterLinkActive,
     HeaderComponentComponent, 
     FooterComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'osrpavicevic';

  constructor (private classScheduleService: ClassScheduleService){ }
  ngOnInit(): void {    
    this.classScheduleService.loadUrls().then(() => {
  });
  }
  
}
