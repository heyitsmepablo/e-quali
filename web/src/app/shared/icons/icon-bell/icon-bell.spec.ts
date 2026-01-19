import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconBell } from './icon-bell';

describe('IconBell', () => {
  let component: IconBell;
  let fixture: ComponentFixture<IconBell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconBell]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconBell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
