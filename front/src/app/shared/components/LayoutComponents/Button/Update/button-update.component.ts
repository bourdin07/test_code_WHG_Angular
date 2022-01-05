import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-update',
  templateUrl: './button-update.component.html'
})
export class ButtonUpdateComponent implements OnInit {
  ngValue: string = 'Valider';
  ngType: string = 'submit';

  constructor() {}

  ngOnInit() {}
}
