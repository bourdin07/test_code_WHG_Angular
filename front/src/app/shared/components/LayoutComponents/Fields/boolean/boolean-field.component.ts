import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-boolean-field',
  templateUrl: './boolean-field.component.html'
})
export class BooleanFieldComponent implements OnInit {
  @Input() field: boolean;

  constructor() {}

  ngOnInit() {}

}
