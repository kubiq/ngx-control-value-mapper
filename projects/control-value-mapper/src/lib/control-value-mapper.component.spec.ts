import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlValueMapperComponent } from './control-value-mapper.component';

describe('ControlValueMapperComponent', () => {
  let component: ControlValueMapperComponent;
  let fixture: ComponentFixture<ControlValueMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlValueMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlValueMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
