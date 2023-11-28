import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListUpdateComponent } from './data-list-update.component';

describe('DataListUpdateComponent', () => {
  let component: DataListUpdateComponent;
  let fixture: ComponentFixture<DataListUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataListUpdateComponent]
    });
    fixture = TestBed.createComponent(DataListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
