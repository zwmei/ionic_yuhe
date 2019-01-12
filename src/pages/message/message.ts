
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
// import { Chooser } from '@ionic-native/chooser/ngx';


@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  private currentSelectDate;
  private defaultSelectToday;
  
  constructor(
    public navCtrl: NavController,
    // private imageChooser: Chooser
    ) {
    this.currentSelectDate = null;
    this.defaultSelectToday =true;
  }

  getFile(){
    console.log('begin getFile()');
    // console.log(this.imageChooser);
    // console.log('image chooser ');
    // try {
      
    // this.imageChooser.getFile('image/gif')
    // .then(file => {
    //   console.log(file ? file.name : 'canceled')
    // })
    // .catch((error: any) => console.error(error));
    // } catch (error) {
    //   alert(error);
    // }
  }

  prevMonth(date){
    console.log('prevMonth:', date);
  }
  nextMonth(date){
    console.log('nextMonth:', date);
  }
  prevSeason(date){
    console.log('prevSeason:', date);
  }
  nextSeason(date){
    console.log('nextSeason:', date);
  }
  prevYear(date){
    console.log('prevYear:', date);
    
  }
  nextYear(date){
    console.log('nextYear:', date);
    
  }

  
  selectDateChange(newDate){
    this.currentSelectDate = newDate;
    console.log('change');
  }

  goToClassManage() {
    this.navCtrl.push('app-home-classManage', { id: 123 });
  }

  goToChildCheckOnManage() {
    this.navCtrl.push('app-home-childCheckOnManage', { id: 123 });
  }

  dateChange(event){
    console.log('caller');
    console.log(event);

  }

  // menu: Array<any>;

  //权限测试代码
  // loadMenu():void{
  //   this.menu = [
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '职工出勤',
  //       key: 'staffAttendance',//用于标识该菜单
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '疾病情况',
  //       key: 'deseaseCondition',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       menuName: '财务报表',
  //       key: 'financialStatements',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '风险预警',
  //       key: 'riskEarlyWarning',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '园长信箱',
  //       key: 'kindergartenMailbox',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '通知公告',
  //       key: 'noticeAnnouncement',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '审批',
  //       key: 'approval',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '班级管理',
  //       key: 'classManagement',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       menuName: '幼儿考勤',
  //       key: 'childAttendance',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '时光轴',
  //       key: 'timeAxis',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '工资查询',
  //       key: 'salaryQuery',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '考勤打卡',
  //       key: 'attendanceCard',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     },
  //     {
  //       id: '',//唯一标识，系统生成
  //       menuName: '日程安排',
  //       key: 'schedule',
  //       fwlj: '',//fwlj 你们自己定
  //       level: 1,//对应一级页面的菜单
  //       tabName: 'home',//对应首页
  //     }
  //   ];

  // }
}