import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PharmacieDetailPage } from './pharmacie-detail.page';

describe('PharmacieDetailPage', () => {
  let component: PharmacieDetailPage;
  let fixture: ComponentFixture<PharmacieDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PharmacieDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
