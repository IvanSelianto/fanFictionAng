import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InplaceeditingComponent } from './inplaceediting.component';

describe('InplaceeditingComponent', () => {
  let component: InplaceeditingComponent;
  let fixture: ComponentFixture<InplaceeditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InplaceeditingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InplaceeditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
