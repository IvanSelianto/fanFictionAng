import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VkAuthenticationComponent } from './vk-authentication.component';

describe('VkAuthenticationComponent', () => {
  let component: VkAuthenticationComponent;
  let fixture: ComponentFixture<VkAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VkAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VkAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
