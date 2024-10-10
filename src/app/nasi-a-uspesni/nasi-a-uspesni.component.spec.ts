import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasiAUspesniComponent } from './nasi-a-uspesni.component';

describe('NasiAUspesniComponent', () => {
  let component: NasiAUspesniComponent;
  let fixture: ComponentFixture<NasiAUspesniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasiAUspesniComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasiAUspesniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
