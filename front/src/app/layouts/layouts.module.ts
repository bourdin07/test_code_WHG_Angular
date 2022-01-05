import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LayoutMainComponent } from './Main/main.component'
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ListGameComponent } from '../components/listGame/listGame.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ButtonDefaultComponent } from '../shared/components/LayoutComponents/Button/Default/button-default.component';

const COMPONENTS = [
  LayoutMainComponent,

  ListGameComponent,

  ButtonDefaultComponent,
]

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule { }
