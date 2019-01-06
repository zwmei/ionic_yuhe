import { Component } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";

@IonicPage({
    name: "app-home-feedbak-email",
})


@Component({
  templateUrl: "feedbackEmail.html",
  selector: "feedbackEmail.ts"
})


export class FeedbackEmail {
    item;
    constructor(params: NavParams) {
        this.item = params.data;
    }

    sendFeedback() {

    }
}