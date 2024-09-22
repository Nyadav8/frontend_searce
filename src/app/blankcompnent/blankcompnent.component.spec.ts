import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankcompnentComponent } from './blankcompnent.component';

describe('BlankcompnentComponent', () => {
  let component: BlankcompnentComponent;
  let fixture: ComponentFixture<BlankcompnentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankcompnentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankcompnentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
