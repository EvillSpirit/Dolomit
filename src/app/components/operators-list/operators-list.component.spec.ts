import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsListComponent } from './operators-list.component';

describe('OperatorsListComponent', () => {
  let component: OperatorsListComponent;
  let fixture: ComponentFixture<OperatorsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorsListComponent]
    });
    fixture = TestBed.createComponent(OperatorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
