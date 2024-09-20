import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-one-news',
  standalone: true,
  imports: [],
  templateUrl: './one-news.component.html',
  styleUrl: './one-news.component.css'
})
export class OneNewsComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam;
      }
    });
  }
}