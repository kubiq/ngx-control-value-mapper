import {AfterContentInit, Component, ContentChild, Input, OnDestroy, Optional, Self} from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tb-control-value-mapper',
  template: '<ng-content></ng-content>',
})
export class ControlValueMapperComponent<T, U> implements ControlValueAccessor, AfterContentInit, OnDestroy {

  @ContentChild(NgModel) childInput: NgModel;

  @Input() mapper: (controlValue: T) => U;
  @Input() parser: (controlValue: U) => T;

  private onChange: (value: T) => {};
  private onTouch: () => {};
  private disabled: boolean;
  private pendingValueSubject = new ReplaySubject<U>(1);
  private aliveSubject = new Subject();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    } else {
      throw new Error('Form component with ngModel directive not found, please provide');
    }
  }

  ngAfterContentInit() {
    this.childInput.valueAccessor.registerOnChange(this.onChange);
    this.childInput.valueAccessor.registerOnTouched(this.onTouch);

    this.pendingValueSubject
      .pipe(takeUntil(this.aliveSubject))
      .subscribe((value) => {
        if (this.parser instanceof Function) {
          const parsedValue = this.parser(value);
          this.childInput.valueAccessor.writeValue(parsedValue);
          this.childInput.control.setValue(parsedValue);
        } else {
          this.childInput.valueAccessor.writeValue(value);
          this.childInput.control.setValue(value);
        }
      });
  }

  registerOnChange(fn: any) {
    this.onChange = (val) => fn(this.mapper(val));
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  writeValue(value: U) {
    this.pendingValueSubject.next(value);
  }

  ngOnDestroy(): void {
    this.aliveSubject.next();
    this.aliveSubject.complete();
  }

}
