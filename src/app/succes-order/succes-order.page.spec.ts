import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccesOrderPage } from './succes-order.page';

describe('SuccesOrderPage', () => {
  let component: SuccesOrderPage;
  let fixture: ComponentFixture<SuccesOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccesOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
