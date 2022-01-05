import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-primary',
  templateUrl: './button-primary.component.html'
})
export class ButtonPrimaryComponent implements OnInit {
  @Input() ngValue: string;
  @Input() ngType: string;
  @Input() disabled: boolean;

  constructor() {}

  ngOnInit() {
    if (this.ngValue === undefined || this.ngValue === '') {
      this.ngValue = 'Valider';
    }
    if (this.ngType === undefined || this.ngType === '') {
      this.ngType = 'button';
    }
  }
}
