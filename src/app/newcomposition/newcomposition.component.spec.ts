import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcompositionComponent } from './newcomposition.component';

describe('NewcompositionComponent', () => {
  let component: NewcompositionComponent;
  let fixture: ComponentFixture<NewcompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
