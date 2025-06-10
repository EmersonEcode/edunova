import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingShartComponent } from './shopping-shart.component';

describe('ShoppingShartComponent', () => {
  let component: ShoppingShartComponent;
  let fixture: ComponentFixture<ShoppingShartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingShartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShoppingShartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
