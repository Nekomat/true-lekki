import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicPage } from './ionic.page';

describe('IonicPage', () => {
  let component: IonicPage;
  let fixture: ComponentFixture<IonicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IonicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
