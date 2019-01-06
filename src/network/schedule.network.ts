import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleNetwork {

  constructor(private http: HttpNetwork) {
  }

  //params: json数据
  //   {
  //     "beginTime": "",
  //     "content": "",
  //     "endTime": "",
  //     "id": 0,
  //     "isRepeat": 0,
  //     "remindFrequency": 0,
  //     "remindTime": 0,
  //     "scheduleDate": "",
  //     "summary": "",
  //     "title": ""
  // }
  saveSchedule(data) {
    return this.http.post('/app/schedule/saveSchedule', data);
  }

  //params：id
  getScheduleDetail(data){
    return this.http.get('/app/schedule/getOne', data);
  }

  //获取日程列表
  //params:queryDate
  getScheduleList(data) {
    return this.http.get('/app/schedule/getList', data);
  }

  //删除日程
  //params:id
  deleteSchedule(data) {
    return this.http.post('/app/schedule/removeSchedule', data);
  }
}
