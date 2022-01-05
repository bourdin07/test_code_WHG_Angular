import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-danger',
  templateUrl: './button-danger.component.html'
})
export class ButtonDangerComponent implements OnInit {
  @Input() ngValue: string;
  @Input() ngType: string;

  constructor() {}

  ngOnInit() {
    if (this.ngValue === undefined || this.ngValue === '') {
      this.ngValue = 'Supprimer';
    }
    if (this.ngType === undefined || this.ngType === '') {
      this.ngType = 'button';
    }
  }
}
