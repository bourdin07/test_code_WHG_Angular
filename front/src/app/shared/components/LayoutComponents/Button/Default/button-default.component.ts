import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-default',
  templateUrl: './button-default.component.html'
})
export class ButtonDefaultComponent implements OnInit {
  @Input() ngValue: string;
  @Input() ngType: string;

  constructor() {
    this.ngValue = "";
    this.ngType = "";
  }

  ngOnInit() {
    if (this.ngValue === undefined || this.ngValue === '') {
      this.ngValue = 'Quitter';
    }
    if (this.ngType === undefined || this.ngType === '') {
      this.ngType = 'button';
    }
  }
}
