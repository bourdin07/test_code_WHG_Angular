import { Component, OnInit, Input } from '@angular/core'
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() title = '';
  @Input() content = '';
  visible: boolean = false;

  constructor() {}

  ngOnInit() {}

  clickMe(): void {
    this.visible = false;
  }
}
