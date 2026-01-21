import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavbarItem } from './dashboard-navbar-item';

describe('DashboardNavbarItem', () => {
  let component: DashboardNavbarItem;
  let fixture: ComponentFixture<DashboardNavbarItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNavbarItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNavbarItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
