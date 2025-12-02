import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEye } from './icon-eye';

describe('IconEye', () => {
  let component: IconEye;
  let fixture: ComponentFixture<IconEye>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconEye]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconEye);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
