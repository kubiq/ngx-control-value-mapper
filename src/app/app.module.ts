import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ControlValueMapperModule } from '../../projects/control-value-mapper/src/lib/control-value-mapper.module';

import { AppComponent } from './app.component';
import { CustomFormControlComponent } from './custom-form-control/custom-form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomFormControlComponent,
  ],
  imports: [
    BrowserModule,
    ControlValueMapperModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
