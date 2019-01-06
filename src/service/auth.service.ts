import { Injectable } from '@angular/core';
import { StorageService, STORAGE_KEY } from './storage.service';
import { isEmpty, isArray } from 'lodash';

@Injectable()
export class AuthService {

  keyList: string[];
  constructor(
    public storage: StorageService
  ) { }

  getAllPageOperation() {
    return {
      home: [
        {
          key: 'home/note',
          name: '喇叭通知'
        },
        {
          key: 'home/info',
          name: '园情总览'
        },
        {
          key: 'home/info/employee',
          name: '职工出勤'
        },
        {
          key: 'home/info/sick',
          name: '疾病情况'
        },
        {
          key: 'home/info/finance',
          name: '财务报表'
        },
        {
          key: 'home/warning',
          name: '风险预警'
        },
        {
          key: 'home/leader',
          name: '园长管理'
        },
        {
          key: 'home/leader/mailbox',
          name: '园长信箱'
        },
        {
          key: 'home/leader/note',
          name: '通知公告'
        },
        {
          key: 'home/leader/audit',
          name: '审批'
        },
        {
          key: 'home/leader/audit/leave',
          name: '请假申请'
        },
        {
          key: 'home/leader/audit/purchase',
          name: '采购申请'
        },
        {
          key: 'home/leader/audit/dimission',
          name: '离职申请'
        },
        {
          key: 'home/leader/audit/reacive',
          name: '领用申请'
        },
        {
          key: 'home/leader/audit/work',
          name: '工单申请'
        },
        {
          key: 'home/child',
          name: '幼儿管理'
        },
        {
          key: 'home/child/class',
          name: '班级管理'
        },
        {
          key: 'home/child/check',
          name: '幼儿考勤'
        },
        {
          key: 'home/child/time',
          name: '时光轴'
        },
        {
          key: 'home/helper',
          name: '个人小助手'
        },
        {
          key: 'home/helper/salary',
          name: '工资查询'
        },
        {
          key: 'home/helper/card',
          name: '考勤打卡'
        },
        {
          key: 'home/helper/schedule',
          name: '日程安排'
        }
      ],
      message: [
        {
          key: 'message',
          name: '消息'
        }
      ],
      dynamic: [
        {
          key: 'dynamic',
          name: '动态'
        }
      ],
      phoneList: [
        {
          key: 'phoneList',
          name: '通讯录'
        }
      ],
      mind: [
        {
          key: 'mind',
          name: '我的'
        }
      ]
    }
  }

  getUserPermission() {
    if (!isEmpty(this.keyList)) {
      return this.keyList;
    }
    let user = this.storage.get(STORAGE_KEY.USER_INFO);
    if (!user || !user.gnpz_opt || !Array.isArray(user.gnpz_opt)) {
      this.keyList = [];
    }
    else {
      this.keyList = user.gnpz_opt.map(item => item.gnpzid);
    }
    return this.keyList;
  }
  hasPermission(key: string) {
    let list = this.getUserPermission();
    return list.indexOf(key) >= 0;
  }
}