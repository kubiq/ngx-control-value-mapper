import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomFormControlModule } from './custom-form-control/custom-form-control.module';
import { ControlValueMapperModule } from '../../projects/control-value-mapper/src/lib/control-value-mapper.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ControlValueMapperModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormControlModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
