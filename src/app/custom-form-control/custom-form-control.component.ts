import {Component, OnDestroy, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from '@angular/forms';
import {FormBuilder, FormGroup} from 'ngx-strongly-typed-forms';
import {untilDestroyed} from 'ngx-take-until-destroy';

export interface IPerson {
  name: string;
  age: number;
  gender: 'men' | 'woman';
}

@Component({
  selector: 'app-custom-form-control',
  templateUrl: 'custom-form-control.component.html',
})
export class CustomFormControlComponent implements ControlValueAccessor, OnDestroy {

  form: FormGroup<IPerson>;
  isDisabled: boolean;
  onTouched;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.form = fb.group<IPerson>({
      name: [null],
      age: [null],
      gender: [null],
    });
  }

  registerOnChange(fn) {
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(fn);
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(value: IPerson) {
    this.form.patchValue(value, {emitEvent: false});
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  ngOnDestroy() {
  }

}
