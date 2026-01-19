import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconMenu } from './icon-menu';

describe('IconMenu', () => {
  let component: IconMenu;
  let fixture: ComponentFixture<IconMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
