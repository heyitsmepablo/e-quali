import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserRequest } from './create-user-request';

describe('CreateUserRequest', () => {
  let component: CreateUserRequest;
  let fixture: ComponentFixture<CreateUserRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
