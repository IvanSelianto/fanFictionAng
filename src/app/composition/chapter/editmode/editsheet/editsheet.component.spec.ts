import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsheetComponent } from './editsheet.component';

describe('EditsheetComponent', () => {
  let component: EditsheetComponent;
  let fixture: ComponentFixture<EditsheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
