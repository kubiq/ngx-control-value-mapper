import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  formControl = new FormControl('Hello world!');

  capitalize = (value: string) => value.toUpperCase();
  lowercase = (value: string) => value.toLowerCase();

}
