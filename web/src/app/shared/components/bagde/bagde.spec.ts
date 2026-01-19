import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bagde } from './bagde';

describe('Bagde', () => {
  let component: Bagde;
  let fixture: ComponentFixture<Bagde>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bagde]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bagde);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
