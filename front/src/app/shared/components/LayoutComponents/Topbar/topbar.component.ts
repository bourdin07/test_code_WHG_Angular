import { Component, OnInit } from "@angular/core";
import { AppService } from "@app/services/app.service";

@Component({
  selector: "cui-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"]
})
export class TopbarComponent implements OnInit {
  title: String;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.getTitle().subscribe(appTitle => (this.title = appTitle));
  }
}
