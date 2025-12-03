import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBanner } from './login-banner';

describe('LoginBanner', () => {
  let component: LoginBanner;
  let fixture: ComponentFixture<LoginBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
