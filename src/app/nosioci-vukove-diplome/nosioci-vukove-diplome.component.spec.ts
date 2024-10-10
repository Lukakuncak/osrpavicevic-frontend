import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosiociVukoveDiplomeComponent } from './nosioci-vukove-diplome.component';

describe('NosiociVukoveDiplomeComponent', () => {
  let component: NosiociVukoveDiplomeComponent;
  let fixture: ComponentFixture<NosiociVukoveDiplomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosiociVukoveDiplomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosiociVukoveDiplomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
