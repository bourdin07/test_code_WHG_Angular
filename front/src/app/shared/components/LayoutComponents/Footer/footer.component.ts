import { Component } from '@angular/core'
import { version } from '../../../../../../package.json';

@Component({
  selector: 'cui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    public version: string = version;
}
