import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ChangeDetectorRef, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { HomePageService } from '../service/home-page.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomePageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  numberOfWorkers: number = 0;
  numberOfYearsWorking: number = 0;
  workersCounted: boolean = false;
  yearsCounted: boolean = false;
  private observer: IntersectionObserver;

  constructor(
    private homePageService: HomePageService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit() {
    this.numberOfWorkers = await this.homePageService.numberOfWorkers();
    this.numberOfYearsWorking = await this.homePageService.numberOfYearsWorking();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIntersectionObserver();
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  initializeIntersectionObserver() {
    const workersElement = document.getElementById('workers');
    const yearsElement = document.getElementById('years');

    console.log('Workers Element:', workersElement);
    console.log('Years Element:', yearsElement);

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'workers' && !this.workersCounted) {
            this.animateCountUp('workers', this.numberOfWorkers);
            this.workersCounted = true;
          } else if (entry.target.id === 'years' && !this.yearsCounted) {
            this.animateCountUp('years', this.numberOfYearsWorking);
            this.yearsCounted = true;
          }
        }
      });
    }, {
      threshold: 0.1 // Adjusted threshold
    });

    if (workersElement) {
      this.observer.observe(workersElement);
    }
    if (yearsElement) {
      this.observer.observe(yearsElement);
    }
  }

  animateCountUp(elementId: string, endValue: number) {
    let current = 0;
    const duration = 1000; 
    const increment = endValue / (duration / 50); 
    const element = document.getElementById(elementId);

    const timer = setInterval(() => {
      current += increment;
      if (element) {
        element.textContent = Math.round(current).toString();
      }
      if (current >= endValue) {
        clearInterval(timer);
        if (element) {
          element.textContent = endValue.toString(); 
        }
      }
    }, 50);
  }
}
