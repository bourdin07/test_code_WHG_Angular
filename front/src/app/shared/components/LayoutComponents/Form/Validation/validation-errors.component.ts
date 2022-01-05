import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidationErrorsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() errors: ValidationErrors;

  constructor() {}

  ngOnInit() {}

}
