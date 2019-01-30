import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFormComponent } from './remove-form.component';

describe('RemoveFormComponent', () => {
  let component: RemoveFormComponent;
  let fixture: ComponentFixture<RemoveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
