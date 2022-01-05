import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InfoComponent } from './Info/info.component'
import { SharedModule } from '../../shared.module'
import { ButtonDefaultComponent } from './Button/Default/button-default.component';

const COMPONENTS = [
  InfoComponent,
  ButtonDefaultComponent,
];

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule { }
