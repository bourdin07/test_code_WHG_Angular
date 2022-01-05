import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BrandGameService } from "src/app/services/brandGame.service";

@Component({
  selector: "layout-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class LayoutMainComponent implements OnInit {
  form: FormGroup;
  listBrandGame: any;

  brandid: any = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
  ];
  country: any = [
    { value: "UK", label: "UK" },
    { value: "US", label: "US" },
    { value: "FR", label: "FR" },
    { value: "KR", label: "KR" },
    { value: "CS", label: "CS" },
  ];
  category: any = [
    { value: "all", label: "All category" },
    { value: "Category 1", label: "Category 1" },
    { value: "Category 2", label: "Category 2" },
    { value: "Category 3", label: "Category 3" },
  ];

  constructor(
    private fb: FormBuilder,
    private brandGameService: BrandGameService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      country: ["UK"],
      brandid: [1],
      category: ["all"]
    });
  }

  submitForm() {
    this.brandGameService
      .getListBrandGame({ country: this.form.controls["country"].value, brandid: this.form.controls["brandid"].value, category: this.form.controls["category"].value })
      .subscribe(
        (response) => {
          this.listBrandGame = response;
        },
        (error) => { }
      );
  }
}
