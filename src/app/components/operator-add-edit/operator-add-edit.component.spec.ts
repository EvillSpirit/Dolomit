import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAddEditComponent } from './operator-add-edit.component';

describe('OperatorAddEditComponent', () => {
  let component: OperatorAddEditComponent;
  let fixture: ComponentFixture<OperatorAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatorAddEditComponent]
    });
    fixture = TestBed.createComponent(OperatorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
