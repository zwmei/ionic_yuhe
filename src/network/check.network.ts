import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class CheckNetwork {
  constructor(private http: HttpNetwork) {

  }
  // 上班打卡
  checkIn(data) {
    return this.http.postForm('/app/attendanceManagement/checkIn', data);
  }
  // 下班打卡
  checkOut(data) {
    return this.http.postForm('/app/attendanceManagement/checkOut', data);
  }
  // 日报
  //params:checkDate
  //return:   [{"id":60,"sbsj":"2019-01-01 14:49:43","xbsj":"2019-01-01 19:12:49","zgid":1}]
  getDayReport(data) {
    return this.http.get('/app/attendanceManagement/getDailyReport', data);
  }
  // 日报
  //params:startDate:'2019-01-01',endDate: '2019-01-05', staffId: 1
  //return:   [1,0,0,1,0]
  getDayReportStatus(data) {
    return this.http.get('/app/attendanceManagement/getAttendanceResult', data);
  }
  // 月报
  //params:checkMonth
  //return: {"absenceCount":3,"beingAbsenceTime":22.5,"beingLateTime":0,"leaveCount":0,"leaveEarlyTime":7.21,"outsideTime":0.0,"overTime":0,"rest":2,"signCount":1,"staffName":"系统管理员","workFrequency":2,"zgid":1}
  getMonthReport(data) {
    return this.http.get('/app/attendanceManagement/getMonthlyReport', data);
  }
  // 获取打卡位置
  getCompanyLocation() {
    return this.http.get('/app/attendanceManagement/getLocationSetting');
  }
  //获取打卡班次
  //return: [{"bcmc":"早班","id":1,"sbsj":"1970-01-01 07:00:00","xbsj":"1970-01-01 12:00:00"},{"bcmc":"午班","id":2,"sbsj":"1970-01-01 13:00:00","xbsj":"1970-01-01 18:00:00"}]
  getWorkShiftList(){
    return this.http.get('/app/attendanceManagement/getWorkShiftList');
  }
  // 排行榜
  getRankList(data) {
    return this.http.get('/app/attendanceManagement/getAttendanceRanks', data);
  }
}
