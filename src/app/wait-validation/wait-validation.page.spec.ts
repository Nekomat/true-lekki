import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WaitValidationPage } from './wait-validation.page';

describe('WaitValidationPage', () => {
  let component: WaitValidationPage;
  let fixture: ComponentFixture<WaitValidationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WaitValidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
