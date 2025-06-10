import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBannerComponent } from './dashboard-banner.component';

describe('DashboardBannerComponent', () => {
  let component: DashboardBannerComponent;
  let fixture: ComponentFixture<DashboardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
