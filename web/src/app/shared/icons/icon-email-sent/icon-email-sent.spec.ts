import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEmailSent } from './icon-email-sent';

describe('IconEmailSent', () => {
  let component: IconEmailSent;
  let fixture: ComponentFixture<IconEmailSent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconEmailSent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconEmailSent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
