import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoClima } from './cartao-clima';

describe('CartaoClima', () => {
  let component: CartaoClima;
  let fixture: ComponentFixture<CartaoClima>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoClima],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoClima);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
