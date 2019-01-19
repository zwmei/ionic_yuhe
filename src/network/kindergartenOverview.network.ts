import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";


//职工出勤
@Injectable()
export class KindergartenOverviewNetwork {

  constructor(private http: HttpNetwork) {

  }
  //获取全体职工考勤情况
  getAllAttendanceInfo(data: any) {
    return this.http.get('/app/workattendance/getAttendances', data);
  }
  //获取所有职工的出勤list
  getStaffAttendanceList(data: any) {
    return this.http.get('/app/workattendance/getStaffAttendances', data);
  }
  //根据类型获取所有职工的出勤list
  getStaffAttendanceListByType(data: any) {
    return this.http.get('/app/workattendance/getAttendancesByType', data);
  }


  //获取所有职工的未签到记录
  getStaffAbsentList(data: any) {
    return this.http.get('/app/workattendance/getStaffAbsence', data);
  }


  //获取整体疾病情况
  getAllSicknessCaseInfo(data: any) {
    return this.http.get('/app/illnessinfo/getIllnessInfos', data);
  }
  //获取某一个疾病情况的病人列表
  getOneSicknessCaseList(data: any) {
    return this.http.get('/app/illnessinfo/selectBySickName', data);
  }
  //获取疾病分类集合
  getSicknessCaseCategoryList(data: any) {
    return this.http.get('/app/illnessinfo/selectByClassId', data);
  }


  //获取财务收入来源情况汇总
  getAllFinancialSourceSum(data: any) {
    return this.http.get('/app/financialstatement/selectIncomeSum', data);
  }
  //获取财务收入来源情况
  getAllFinancialSourceInfo(data: any) {
    return this.http.get('/app/financialstatement/selectIncomes', data);
  }

  //获取财务收入来源情况 (排名)
  getAllFinancialSourceInfoRanking(data: any) {
    return this.http.get('/app/financialstatement/selectIncomesRank', data);
  }

  //获取财务支出情况汇总
  getAllFinancialOutputSum(data: any) {
    return this.http.get('/app/financialstatement/selectPayoutSum', data);
  }
  //获取财务支出情况
  getAllFinancialOutputInfo(data: any) {
    return this.http.get('/app/financialstatement/selectPayouts', data);
  }
  //获取财务支出情况 (排名)
  getAllFinancialOutputInfoRanking(data: any) {
    return this.http.get('/app/financialstatement/selectPayoutsRank', data);
  }




}
