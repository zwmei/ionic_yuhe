import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class ApprovalNetwork {
  constructor(private http: HttpNetwork) {

  }
  // 获取发起列表
  getApplayApprovalList(data) {
    return this.http.get('/app/approval/myApplication/getApplicationList', data);
  }
  // 获取已审批列表
  getApprovalList(data) {
    return this.http.get('/app/approval/myApprovals/getApprovedList', data);
  }
  // 获取未审批列表
  getUnApprovalList(data) {
    return this.http.get('/app/approval/myApprovals/getWaitingList', data);
  }
  // 获取违阅读列表 抄送
  getReadCopyList(data) {
    return this.http.get('/app/approval/myReception/getReadList', data);
  }
  // 获取已阅读列表 抄送
  getUnReadCopyList(data) {
    return this.http.get('/app/approval/myReception/getUnreadList', data);
  }
  // 审核通过
  approvalSucceed(data) {
    return this.http.postForm('/app/approval/myApprovals/validate', data);
  }
  // 审核不通过
  approvalFaild(data) {
    return this.http.postForm('/app/approval/myApprovals/invalidate', data);
  }
  // 撤销申请
  withdrowApplay(data) {
    return this.http.postForm('/app/approval/myApplication/revoke', data);
  }
  // 请假
  applyRestDetail(data) {
    return this.http.get('/app/approval/viewApproval/billType3', data);
  }
  // 采购
  applyBuyDetail(data) {
    return this.http.get('/app/approval/viewApproval/billType1', data);
  }
  // 离职
  applyLeaveDetail(data) {
    return this.http.get('/app/approval/viewApproval/billType4', data);
  }
  // 物品领用
  applyGoodDetail(data) {
    return this.http.get('/app/approval/viewApproval/billType2', data);
  }
  // 工单
  applyOrderDetail(data) {
    return this.http.get('/app/approval/viewApproval/billType5', data);
  }
  // 请假
  applyForReset(data) {
    return this.http.postForm('/app/approval/application/postLeave', data);
  }
  // 采购
  applyForBuy(data) {
    return this.http.postForm('/app/approval/application/postPurchase', data);
  }
  // 工单
  applyForOrder(data) {
    return this.http.postForm('/app/approval/application/postRepair', data);
  }
  // 领用
  applyForGood(data) {
    return this.http.postForm('/app/approval/application/postRecieveGoods', data);
  }
  // 离职
  applyForLeave(data) {
    return this.http.postForm('/app/approval/application/postResignation', data);
  }
  // 请假类型
  getRestApplayType() {
    return this.http.get('/app/approval/application/getLeaveType');
  }
  // 领用类型
  getReciveApplayType() {
    return this.http.get('/app/approval/application/getRecieveType');
  }
  // 离职类型
  getRestResginType() {
    return this.http.get('/app/approval/application/getResignationType');
  }
  // 领用物资
  getReciveGoodType() {
    return this.http.get('/app/approval/application/getRecieveGoodItems');
  }
  // 采购物资
  getPurchaseGoodType() {
    return this.http.get('/app/approval/application/getPurchaseGoodItems');
  }
  getStaffList() {
    return this.http.get('/app/approval/application/getStaffList');
  }
  //   请假时长
  getResetLength(data) {
    return this.http.get('/app/approval/application/computeLeaveHours', data);
  }
  // 标记一度
  readCopyTome(data) {
    return this.http.postForm('/app/approval/myReception/markReaded', data);
  }
}
