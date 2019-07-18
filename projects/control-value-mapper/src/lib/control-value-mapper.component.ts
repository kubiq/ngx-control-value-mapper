import { AfterContentInit, Component, ContentChild, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NgModel } from '@angular/forms';

@Component({
  selector: 'tb-control-value-mapper',
  template: '<ng-content></ng-content>',
})
export class ControlValueMapperComponent<T, U> implements ControlValueAccessor, AfterContentInit {

  @ContentChild(NgModel) childInput: NgModel;

  @Input() mapper: (controlValue: T) => U;
  @Input() parser: (controlValue: U) => T;

  private onChange: (value: T) => {};
  private onTouch: () => {};
  private disabled: boolean;

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
    console.log('ngAfterContentInit');
    // this.childInput.valueChanges.subscribe((value => {
    //   this.onChange(this.mapper(value));
    // }));

    this.childInput.valueAccessor.registerOnChange(this.onChange);
    this.childInput.valueAccessor.registerOnTouched(this.onTouch);
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

    console.log('write value', value);

    if (this.parser instanceof Function) {
      this.childInput.valueAccessor.writeValue(this.parser(value));
    } else {
      this.childInput.valueAccessor.writeValue(value);
    }

  }


}
