import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantDocumentsComponent } from './important-documents.component';

describe('ImportantDocumentsComponent', () => {
  let component: ImportantDocumentsComponent;
  let fixture: ComponentFixture<ImportantDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportantDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
