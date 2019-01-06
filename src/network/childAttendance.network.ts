import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class ChildAttendanceNetwork {

  constructor(private http: HttpNetwork) {
  }
  //params: startDate,endDate
  getSummary(data) {
    return this.http.get('/app/studentAttendance/getClassInforns', data);
  }

  //根据不通的幼儿状态获取以班级分组的学生列表（点击）
  //params：checkData
  getStudentsOfClassGroupByStatus(data){
    return this.http.get('/app/studentAttendance/getAbsenceList', data);
  }

  //根据不通的幼儿状态获取以班级分组的学生列表（图标点击时）
  //params: startDate, endDate
  getStudentsOfClassGroupByStatusOnChartClick(data){
    return this.http.get('/app/studentAttendance/getAbsenceDetailList', data);
  }

  //获取出勤率排名（分页）
  //startDate,endDate,pageSize,pageNo
  getStudentRankings(data) {
    return this.http.get('/app/studentAttendance/getChildrenAttendancesRank', data);
  }

  //获取出勤率班级列表
  //startDate,endDate
  getClassAttendanceList(data) {
    return this.http.get('/app/studentAttendance/getClassAttendances', data);
  }

  //获取班级学生出勤列表
  //startDate,endDate,classId
  getStudentAttendanceListByClass(data) {
    return this.http.get('/app/studentAttendance/getClassAttendancesDetails', data);
  }

  //获取饼图信息
  //startDate,endDate
  getAttendanceRateChart(data) {
    return this.http.get('/app/studentAttendance/getClassInforns', data);
  }
}
