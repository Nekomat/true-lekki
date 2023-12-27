import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserValidPage } from './user-valid.page';

describe('UserValidPage', () => {
  let component: UserValidPage;
  let fixture: ComponentFixture<UserValidPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserValidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
