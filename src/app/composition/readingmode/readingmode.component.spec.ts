import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingmodeComponent } from './readingmode.component';

describe('ReadingmodeComponent', () => {
  let component: ReadingmodeComponent;
  let fixture: ComponentFixture<ReadingmodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingmodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
