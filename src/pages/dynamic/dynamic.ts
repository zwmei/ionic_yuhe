import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { ToastService } from '../../service/toast.service';
import { HTTP_URL } from '../../network/http';

@Component({
  templateUrl: 'dynamic.html'
})
export class DynamicPage { 

  user: any = {
    
  };

  contact: any = {};

  list: any = [];
  constructor(private nav: NavController,
    private storage: StorageService,
    private toastService: ToastService) {
      this.loadUserInfo();
      this.loadMoments();
  }


  loadUserInfo() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    if (userInfo && typeof userInfo === "object") {
      this.user.name = userInfo.zgxm;
      this.user.photo = HTTP_URL.MAIN + '/images/' + userInfo.photo;
    }
  }

  loadMoments(){
    this.list = [{
      name: '刘嘉玲',
      photo: '',
      content: '心情很好很好哦！！！',
      isSelf: false,
      isLike: false,
      pictures: ['','',''],
      likes: [{id: 1, name: '小明'},{id: 2, name: 'wangmeili'}],
      comments: [{id: 1, name: '莎士比亚', content: '一马当先，吉祥如意'}],
      timeString: '8分钟前'
    }, {
      name: '刘嘉玲2',
      photo: '发钱啦发钱啦',
      content: '',
      isSelf: false,
      isLike: false,
      likes: [],
      pictures: ['','',''],
      comments: [{id: 1, name: '莎士比亚', content: '一马当先，吉祥如意'}],
      timeString: '30分钟前'
    }, {
      name: '刘嘉玲3',
      photo: '',
      content: '发钱啦发钱啦222222',
      isSelf: false,
      isLike: false,
      likes: [],
      pictures: ['','',''],
      comments: [],
      timeString: '1小时前'
    }];
  }
}
