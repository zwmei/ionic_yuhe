import { DatePipe } from '@angular/common';
import { UserNetwork } from './../../../network/user.network';
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";


@IonicPage({
  name: "app-home-salary"
})
@Component({
  templateUrl: "salary.html",
  selector: "salary.ts"
})

export class Salary {
    
  salaryDate: any;
  month = 0;
  salaryData: any = {};
  constructor( 
    public userNetwork: UserNetwork,
    private datePipe: DatePipe,
  ) {
    this.salaryDate = new Date();
    this.getSalaryData();
  }

  nextMonth() {
    console.log("下一月")
    this.month ++;
    this.getSalaryData();
  }
  preMonth() {
    console.log("上一月")
    this.month --;
    this.getSalaryData();
  }

  getSalaryData() {
    this.salaryDate = new Date().setMonth(new Date().getMonth() + this.month);
    let dateString = this.datePipe.transform(this.salaryDate, 'yyyy-MM');
    this.userNetwork.getSalaryDetails({checkMonth: dateString}).subscribe((data: any) => {
      console.log(data)
      this.salaryData = data;
    }, error => {
      console.log(error)
    })
  }
}