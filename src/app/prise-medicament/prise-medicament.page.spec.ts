import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriseMedicamentPage } from './prise-medicament.page';

describe('PriseMedicamentPage', () => {
  let component: PriseMedicamentPage;
  let fixture: ComponentFixture<PriseMedicamentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PriseMedicamentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
