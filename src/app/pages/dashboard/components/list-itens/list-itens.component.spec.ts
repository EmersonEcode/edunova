import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItensComponent } from './list-itens.component';

describe('ListItensComponent', () => {
  let component: ListItensComponent;
  let fixture: ComponentFixture<ListItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
