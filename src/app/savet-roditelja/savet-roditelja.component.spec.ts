import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavetRoditeljaComponent } from './savet-roditelja.component';

describe('SavetRoditeljaComponent', () => {
  let component: SavetRoditeljaComponent;
  let fixture: ComponentFixture<SavetRoditeljaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavetRoditeljaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavetRoditeljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
