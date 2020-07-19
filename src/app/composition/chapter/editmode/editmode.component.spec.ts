import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmodeComponent } from './editmode.component';

describe('EditmodeComponent', () => {
  let component: EditmodeComponent;
  let fixture: ComponentFixture<EditmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
