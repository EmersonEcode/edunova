import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUserComponent } from './perfil-user.component';

describe('PerfilUserComponent', () => {
  let component: PerfilUserComponent;
  let fixture: ComponentFixture<PerfilUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
