import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-boolean-actif-field',
  templateUrl: './boolean-actif-field.component.html'
})
export class BooleanActifFieldComponent implements OnInit {
  @Input() field: boolean;

  constructor() {}

  ngOnInit() {}

}
