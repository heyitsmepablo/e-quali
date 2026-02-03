import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserRequest } from './form-user-request';

describe('FormUserRequest', () => {
  let component: FormUserRequest;
  let fixture: ComponentFixture<FormUserRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUserRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUserRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
