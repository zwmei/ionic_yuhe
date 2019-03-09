import { Component } from "@angular/core";
import { NavParams, IonicPage} from "ionic-angular";

@IonicPage({
  name: "app-home-big-picture"
})
@Component({
  templateUrl: "bigPicture.html",
  selector: "bigPicture.ts"
})
export class BigPicture {
  url: any = {};
  constructor(
    params: NavParams,
  ) {
    this.url = params.data;
    console.log(params);
  }
}
