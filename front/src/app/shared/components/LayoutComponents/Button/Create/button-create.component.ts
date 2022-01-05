import { Component, OnInit, Input } from "@angular/core";
import { InnerPopupComponent } from "ng-zorro-antd/date-picker/inner-popup.component";

@Component({
  selector: "button-create",
  templateUrl: "./button-create.component.html"
})
export class ButtonCreateComponent implements OnInit {
  @Input() ngValue: string;
  @Input() ngType: string;

  constructor() {}

  ngOnInit() {
    if (this.ngValue === undefined || this.ngValue === "") {
      this.ngValue = "Créer";
    }
    if (this.ngType === undefined || this.ngType === "") {
      this.ngType = "submit";
    }
  }
}
