import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BrandGameService } from "src/app/services/brandGame.service";

import { AppService } from "src/app/services/app.service";

@Component({
  selector: "component-list-game",
  templateUrl: "./list-game.component.html",
  styleUrls: ["./list-game.component.scss"]
})
export class ListGameComponent implements OnInit {
  @Input() listBrandGame: any;

  constructor (private appService: AppService) { }

  ngOnInit(): void {

  }

  showAlert(item: any) {
    // alert(item.game.launchcode);
    this.appService.toastNotification("", "lauchcode : " + item.game.launchcode);
  }
}
