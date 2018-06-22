import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShineServicesComponent } from './shine-services.component';

describe('ShineServicesComponent', () => {
  let component: ShineServicesComponent;
  let fixture: ComponentFixture<ShineServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShineServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShineServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
