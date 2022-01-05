import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsModule } from './layouts/layouts.module';
import { LayoutMainComponent } from './layouts/Main/main.component';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: LayoutMainComponent,
    children: []
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,

    RouterModule.forRoot(routes),
    LayoutsModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
