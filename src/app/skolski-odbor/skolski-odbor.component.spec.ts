import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkolskiOdborComponent } from './skolski-odbor.component';

describe('SkolskiOdborComponent', () => {
  let component: SkolskiOdborComponent;
  let fixture: ComponentFixture<SkolskiOdborComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkolskiOdborComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkolskiOdborComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
