import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CustomFormControlComponent } from './custom-form-control.component';

@NgModule({
  declarations: [
    CustomFormControlComponent,
  ],
  imports: [
    ReactiveFormsModule,
  ],
  exports: [
    CustomFormControlComponent,
  ],
})
export class CustomFormControlModule { }
