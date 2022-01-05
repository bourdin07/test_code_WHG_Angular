import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
// import { NgxBarcodeModule } from "ngx-barcode";
import { NzTableModule } from "ng-zorro-antd/table";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzCarouselModule } from "ng-zorro-antd/carousel";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzSwitchModule } from "ng-zorro-antd/switch";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzBackTopModule } from "ng-zorro-antd/back-top";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzNotificationModule } from "ng-zorro-antd/notification";
import { NzUploadModule } from "ng-zorro-antd/upload";
import { NzStepsModule } from "ng-zorro-antd/steps";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzCardModule } from "ng-zorro-antd/card";
// import { TranslateModule } from '@ngx-translate/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NzListModule } from 'ng-zorro-antd/list';

const MODULES = [
  CommonModule,
  BrowserAnimationsModule,
  BrowserModule,
  RouterModule,

  // NgxBarcodeModule,
  NzTableModule,
  NzButtonModule,
  NzIconModule,
  NzTypographyModule,
  NzToolTipModule,
  NzPopoverModule,
  NzProgressModule,
  NzCarouselModule,
  NzRadioModule,
  NzFormModule,
  NzCollapseModule,
  NzGridModule,
  NzInputModule,
  NzSelectModule,
  NzDatePickerModule,
  NzMenuModule,
  NzAlertModule,
  NzDrawerModule,
  NzSwitchModule,
  NzDropDownModule,
  NzCheckboxModule,
  NzAvatarModule,
  NzLayoutModule,
  NzBackTopModule,
  NzModalModule,
  NzNotificationModule,
  NzUploadModule,
  NzStepsModule,
  NzInputNumberModule,
  NzTabsModule,
  NzPaginationModule,
  NzSpinModule,
  NzCardModule,
  NzListModule,
];

@NgModule({
  imports: [...MODULES],
  // exports: [...MODULES, TranslateModule]
  exports: [...MODULES]
})
export class SharedModule {}
