import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultFoundsComponent } from './consult-founds.component';

describe('ConsultFoundsComponent', () => {
  let component: ConsultFoundsComponent;
  let fixture: ComponentFixture<ConsultFoundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultFoundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultFoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
