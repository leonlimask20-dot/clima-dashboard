import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Previsao } from './previsao';

describe('Previsao', () => {
  let component: Previsao;
  let fixture: ComponentFixture<Previsao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Previsao],
    }).compileComponents();

    fixture = TestBed.createComponent(Previsao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
