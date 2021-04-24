import { Component, OnInit } from "@angular/core";
import { SharedService } from "../shared.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public searchText: string = "";
  constructor(private sharedService: SharedService) {}

  ngOnInit() {}

  searchData(text) {
    this.sharedService.setSearchText(text);
  }

  short(text) {
    this.sharedService.setShortText(text.target.value);
  }
}
