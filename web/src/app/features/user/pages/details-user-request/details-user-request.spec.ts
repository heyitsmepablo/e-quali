import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUserRequest } from './details-user-request';

describe('DetailsUserRequest', () => {
  let component: DetailsUserRequest;
  let fixture: ComponentFixture<DetailsUserRequest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsUserRequest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsUserRequest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
