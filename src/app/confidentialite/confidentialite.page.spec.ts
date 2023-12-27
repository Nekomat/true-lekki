import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfidentialitePage } from './confidentialite.page';

describe('ConfidentialitePage', () => {
  let component: ConfidentialitePage;
  let fixture: ComponentFixture<ConfidentialitePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConfidentialitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
