import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubheader } from './dashboard-subheader';

describe('DashboardSubheader', () => {
  let component: DashboardSubheader;
  let fixture: ComponentFixture<DashboardSubheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSubheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSubheader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
