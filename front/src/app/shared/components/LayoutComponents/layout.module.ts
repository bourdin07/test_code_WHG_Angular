import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { SharedModule } from '@shared/shared.module'
import { ChartistModule } from 'ng-chartist'

import { TopbarComponent } from '@shared/components/LayoutComponents/Topbar/topbar.component'
import { TopbarBitcoinPriceComponent } from '@shared/components/LayoutComponents/Topbar/BitcoinPrice/bitcoin-price.component'
import { TopbarHomeMenuComponent } from '@shared/components/LayoutComponents/Topbar/HomeMenu/home-menu.component'
import { TopbarIssuesHistoryComponent } from '@shared/components/LayoutComponents/Topbar/IssuesHistory/issues-history.component'
import { TopbarLiveSearchComponent } from '@shared/components/LayoutComponents/Topbar/LiveSearch/live-search.component'
import { TopbarProfileMenuComponent } from '@shared/components/LayoutComponents/Topbar/ProfileMenu/profile-menu.component'
import { TopbarProjectManagementComponent } from '@shared/components/LayoutComponents/Topbar/ProjectManagement/project-management.component'
import { MenuLeftComponent } from '@shared/components/LayoutComponents/Menu/MenuLeft/menu-left.component'
import { MenuTopComponent } from '@shared/components/LayoutComponents/Menu/MenuTop/menu-top.component'
import { FooterComponent } from '@shared/components/LayoutComponents/Footer/footer.component'
import { BreadcrumbsComponent } from '@shared/components/LayoutComponents/Breadcrumbs/breadcrumbs.component'
import { SettingsComponent } from '@shared/components/LayoutComponents/Settings/settings.component'
import { TableComponent } from "@shared/components/LayoutComponents/Table/table.component";
import { BooleanPipe } from "@shared/pipes/boolean.pipe";
import { ValidationErrorsComponent } from "@shared/components/LayoutComponents/Form/Validation/validation-errors.component";
import { BooleanFieldComponent } from "@shared/components/LayoutComponents/Fields/boolean/boolean-field.component";
import { HistoryComponent } from "@shared/components/LayoutComponents/History/history.component";
import { AdvancedTableComponent } from "@shared/components/LayoutComponents/AdvancedTable/advanced-table.component";
import { BooleanActifPipe } from "@shared/pipes/boolean-actif.pipe";
import { BooleanActifFieldComponent } from "@shared/components/LayoutComponents/Fields/boolean-actif/boolean-actif-field.component";
import { ButtonDefaultComponent } from "@shared/components/LayoutComponents/Button/Default/button-default.component";
import { ButtonPrimaryComponent } from "@shared/components/LayoutComponents/Button/Primary/button-primary.component";
import { ButtonDangerComponent } from "@shared/components/LayoutComponents/Button/Danger/button-danger.component";
import { ButtonCreateComponent } from "@shared/components/LayoutComponents/Button/Create/button-create.component";
import { ButtonUpdateComponent } from "@shared/components/LayoutComponents/Button/Update/button-update.component";
import { PlanningTransverseComponent } from "@shared/components/LayoutComponents/Planning/PlanningTransverse/planning-transverse.component";
import { BrowserDatepickerComponent } from "@shared/components/LayoutComponents/Form/BrowserDatepicker/browser-datepicker.component";
import { ZipCodeComponent } from "@shared/components/LayoutComponents/Form/ZipCode/zip-code.component";
import { BarcodeReaderComponent } from "@shared/components/LayoutComponents/BarcodeReader/barcode-reader.component";
import { BarcodeGeneratorComponent } from "@shared/components/LayoutComponents/BarcodeGenerator/barcode-generator.component";
import { FileDownloadComponent } from "@shared/components/LayoutComponents/FileDownload/file-download.component";
import { InfoComponent } from './Info/info.component'

const COMPONENTS = [
  TopbarComponent,
  TopbarBitcoinPriceComponent,
  TopbarHomeMenuComponent,
  TopbarIssuesHistoryComponent,
  TopbarLiveSearchComponent,
  TopbarProfileMenuComponent,
  TopbarProjectManagementComponent,
  MenuLeftComponent,
  MenuTopComponent,
  FooterComponent,
  BreadcrumbsComponent,
  SettingsComponent,
  TableComponent,
  AdvancedTableComponent,
  BooleanPipe,
  BooleanActifPipe,
  ValidationErrorsComponent,
  BooleanFieldComponent,
  BooleanActifFieldComponent,
  HistoryComponent,
  InfoComponent,
  ButtonDefaultComponent,
  ButtonPrimaryComponent,
  ButtonCreateComponent,
  ButtonUpdateComponent,
  ButtonDangerComponent,
  PlanningTransverseComponent,
  BrowserDatepickerComponent,
  ZipCodeComponent,
  BarcodeReaderComponent,
  BarcodeGeneratorComponent,
  FileDownloadComponent,
];

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, PerfectScrollbarModule, ChartistModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutModule { }
