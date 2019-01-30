import { UserNetwork } from './../../../network/user.network';
import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { formatDate } from '../../../network/http';


@IonicPage({
  name: "app-home-salary"
})
@Component({
  templateUrl: "salary.html",
  selector: "salary.ts"
})

export class Salary {

  salaryDate: any;
  amount: number = 0;
  month = 0;
  gzxmDetails: any = [];
  salaryData: any = {};
  constructor(
    public userNetwork: UserNetwork
  ) {
    this.salaryDate = new Date();
    // this.getSalaryData();
    this.loadSalaryData(new Date());
  }

  // nextMonth() {
  //   console.log("下一月")
  //   this.month ++;
  //   this.getSalaryData();
  // }
  // preMonth() {
  //   console.log("上一月")
  //   this.month --;
  //   this.getSalaryData();
  // }


  nextMonth(date) {
    console.log('next month:');
    this.loadSalaryData(date);
  }
  prevMonth(date) {
    console.log('prev month:', date);
    this.loadSalaryData(date);
  }

  loadSalaryData(date){
    let dateString = formatDate(date, 'yyyy-MM');
    console.log('date:', dateString);
    this.userNetwork.getSalaryDetails({checkMonth: dateString}).subscribe((data: any) => {
      // this.salaryData = data;
      this.amount = data.sfgz.toFixed(2);
      console.log('-----', data);
      if (data.gzxmDetails) {
        console.log(data.gzxmDetails);
        this.gzxmDetails = data.gzxmDetails.map(item=>{
          return {key: item[0], value: item[2].toFixed(2)};
        });
        console.log(this.gzxmDetails);
        // this.gzxmDetails = data.gzxmDetails;
      }
    }, error => {
      console.log(error)
    })
  }
}
