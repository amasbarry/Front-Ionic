import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaiementEffectuePage } from './paiement-effectue.page';

describe('PaiementEffectuePage', () => {
  let component: PaiementEffectuePage;
  let fixture: ComponentFixture<PaiementEffectuePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaiementEffectuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
