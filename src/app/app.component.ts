import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { none, Option, option } from 'ts-option';
import { IPerson } from './custom-form-control/custom-form-control.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  formatPhoneNumber = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d*)$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return null;
  }
  phoneParser = (value: string) => {
    return ('' + value).replace(/\(\)/g, '');
  }

  capitalize = (value: string) => value.toUpperCase();

  arrayMapper = (value: string) => ([value]);
  arrayParser = (value: [string]) => {
    const [parsedValue] = value;
    return parsedValue;
  }

  optionMapper = (value: string) => value ? option(value) : none;
  optionParser = (maybeValue: Option<string>) => maybeValue.getOrElseValue(null);

  customMapper = (value: IPerson) => {
    return {...value, age: value.age + 10};
  }
  customParser = (maybeValue: Option<string>) => maybeValue.getOrElseValue(null);

  phoneControl = new FormControl(this.formatPhoneNumber('9994554655'));
  textControl = new FormControl('HELLO WORLD!');
  arrayControl = new FormControl(['Im in array']);
  optionControl = new FormControl(option('Im optional value'));
  customControl = new FormControl({name: 'TheBiftek', age: 20, gender: 'men'});

}
