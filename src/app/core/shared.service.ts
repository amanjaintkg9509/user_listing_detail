import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  public searchText: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public shortText: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public rootUrl: string = "https://api.github.com";
  constructor(private http: HttpClient) {}

  get(path) {
    return this.http.get(this.rootUrl + path);
  }

  setSearchText(data) {
    this.searchText.next(data);
  }

  getSearchText() {
    return this.searchText.asObservable();
  }

  setShortText(data) {
    this.shortText.next(data);
  }

  getShortText() {
    return this.shortText.asObservable();
  }
}
