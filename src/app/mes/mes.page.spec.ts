import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesPage } from './mes.page';

describe('MesPage', () => {
  let component: MesPage;
  let fixture: ComponentFixture<MesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
