import { Component } from "@angular/core";
import { NavParams, IonicPage } from "ionic-angular";

@IonicPage({
    name: "app-home-attendance-rank",
})

@Component({
  templateUrl: "attendanceRank.html",
  selector: "attendanceRank.ts"
})


export class AttendanceRank {
    items;
    constructor(params: NavParams) {
        this.items = [
            {
                image: "",
                name: "小猪佩奇",
                description: "本月第一个早到",
            },
            {
                image: "",
                name: "小猪佩奇",
                description: "本月第一个早到",
            },
            {
                image: "",
                name: "小猪佩奇",
                description: "本月第一个早到",
            },
            {
                image: "",
                name: "小猪佩奇",
                description: "本月第一个早到",
            },
            {
                image: "",
                name: "小猪佩奇",
                description: "本月第一个早到",
            }
        ]
    }
}