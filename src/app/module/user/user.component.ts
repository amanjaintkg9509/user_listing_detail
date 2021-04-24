import { Component, OnInit } from "@angular/core";
import { NgxPaginationModule } from "ngx-pagination";
import { SharedService } from "src/app/core/shared.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  totalRecords: number = 0;
  userData: any = [];
  p: number = 1;
  search: string = "a";
  userDetail: any;
  repoDetail: any;
  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.getSearchText().subscribe((searchText: any) => {
      if (typeof searchText === "object") return false;
      if (searchText.length > 0)
        this.getData("/search/users?q=" + searchText + "&per_page=30");
    });

    this.sharedService.getShortText().subscribe((shortText: any) => {
      if (typeof shortText === "object") return false;
      if (shortText.length > 0) {
        if (shortText === "name_asc") {
          this.userData = this.userData.sort((a, b) =>
            a.login.localeCompare(b.login)
          );
        }

        if (shortText === "name_desc") {
          this.userData = this.userData.sort((a, b) =>
            b.login.localeCompare(a.login)
          );
        }
      }
    });

    this.getData("/search/users?q=" + this.search + "&per_page=30");
  }

  getData(path) {
    this.sharedService.get(path).subscribe(
      (res: any) => {
        if (res.errors) {
          this.totalRecords = 0;
          this.userData.length = 0;
          return false;
        }
        this.totalRecords = res.total_count;
        this.userData = res.items;
      },
      (err: any) => {
        this.totalRecords = 0;
        this.userData.length = 0;
      }
    );
  }

  detail(text) {
    if (this.userDetail && this.userDetail.login === text) {
      this.userDetail = {};
      return false;
    }

    this.sharedService.get("/users/" + text).subscribe((res: any) => {
      this.userDetail = res;
    });

    this.sharedService
      .get("/users/" + text + "/repos")
      .subscribe((res: any) => {
        this.repoDetail = res;
      });
  }
}
