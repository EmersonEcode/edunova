import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponent } from './signin-form.component';

describe('SigninFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignInFormComponent]
    });
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
