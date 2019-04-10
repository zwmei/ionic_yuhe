import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { ToastService } from '../../service/toast.service';
import { HTTP_URL, getDateDesc } from '../../network/http';
import { DynamicNetwork } from '../../network/dynamic.network';
import { ActionSheetService } from '../../service/actionSheet.service';
import { ConfirmService } from '../../service/confirm.service';
import { GallaryService } from '../../service/gallary.service';

@Component({
  templateUrl: 'dynamic.html'
})

export class DynamicPage {
  @ViewChild('input') myInput;
  user: any = {

  };

  contact: any = {};

  list: any = [];
  currentMomentComment: any = {};
  showCommentArea = false;
  constructor(private nav: NavController,
    private storage: StorageService,
    private toastService: ToastService,
    private actionSheetService: ActionSheetService,
    private confirmService: ConfirmService,
    private dynamicNetwork: DynamicNetwork,
    private gallaryService: GallaryService) {
    // this.loadUserInfo();
    // this.loadMoments();
  }

  stopProp($event) {
    $event.stopPropagation();
  }
  closeCommentArea() {
    this.showCommentArea = false;
  }

  openComment(moment, e) {
    this.showCommentArea = true;
    // this.myInput.setFocus();
    if (moment.id === this.currentMomentComment.momentId) {
      e.stopPropagation();
      return;
    }

    this.currentMomentComment.momentId = moment.id;
    this.currentMomentComment.content = '';
    this.currentMomentComment.current = moment;
    e.stopPropagation();
  }

  saveComment() {
    console.log('this.currentMomentComment.content', this.currentMomentComment.content);
    if (!this.currentMomentComment.content) {
      this.toastService.show('请填写评论！');
      return;
    }
    this.dynamicNetwork.sendComment(
      {
        contentId: this.currentMomentComment.momentId,
        comment: this.currentMomentComment.content
      })
      .subscribe((commentResult: any) => {
        if (commentResult.status === 0 && commentResult.result && commentResult.result.commentId) {
          this.toastService.show('评论成功!');
          this.currentMomentComment.current.comments.push({ id: commentResult.result.commentId, name: this.user.name, content: this.currentMomentComment.content });
          this.currentMomentComment = {};
          this.closeCommentArea();
        } else {
          this.toastService.show('评论失败！');
        }
      }, err => {
        this.toastService.show('评论失败！');
      });
  }

  showActionSheet(moment, comment, commentIndex): void {
    if (comment.ownerId !== this.user.id) {
      return;
    }
    console.log(commentIndex);
    this.actionSheetService.show({
      title: '您确定要删除此评论吗？',
      buttons: [{
        text: '删除评论',
        role: 'destructive',
        handler: () => {
          this.removeComment(moment, comment.id, commentIndex);
        },
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    })
  }

  removeComment(moment, commentId, commentIndex) {
    this.dynamicNetwork.removeMomentComment({ commentId: commentId })
      .subscribe((result: any) => {
        if (result.status === 0) {
          moment.comments.splice(commentIndex, 1);
          this.toastService.show('删除评论成功！');
        }
      }, err => {
        this.toastService.show('删除评论失败');
      });
  }

  toggleLike(moment) {
    console.log(moment.isLike);

    if (moment.isLike) {
      //取消
      this.dynamicNetwork.cancelLikeMoment({ contentId: moment.id })
        .subscribe((result: any) => {
          if (result.status === 0) {
            moment.isLike = false;
            let likeIndex = -1;
            for (var i = 0; i < moment.likes.length; i++) {
              if (moment.likes[i].id === moment.id) {
                likeIndex = i;
                break;
              }
            }
            moment.likes.splice(likeIndex, 1);
          }
        }, err => {
          console.log(err);
          this.toastService.show('点赞失败！');
        });
    } else {
      //点赞
      this.dynamicNetwork.likeMoment({ contentId: moment.id })
        .subscribe((result: any) => {
          if (result.status === 0) {
            moment.isLike = true;
            moment.likes.push({ id: this.user.id, name: this.user.name });
          }
        }, err => {
          console.log(err);
          this.toastService.show('点赞失败！');
        });
    }
    console.log('toggle like');
  }


  resetPagination() {

    this.pagination.pageNo = 1;
    this.list = [];
    this.pagination.completed = false;
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.loadUserInfo();
    this.resetPagination();
    this.loadMoments();
  }

  loadUserInfo() {
    let userInfo = this.storage.get(STORAGE_KEY.USER_INFO);
    if (userInfo && typeof userInfo === "object") {
      this.user.name = userInfo.zgxm;
      this.user.id = userInfo.id;
      this.user.photo = HTTP_URL.MAIN + '/images/' + userInfo.photo;
    }
  }

  pagination: { pageNo: number, size: number, completed: boolean } = { pageNo: 1, size: 10, completed: false };
  loadMoments(callback?: any) {
    this.dynamicNetwork.getMoments({ pageNo: this.pagination.pageNo, size: this.pagination.size })
      .subscribe(data => {
        console.log('dynamic:', data);
        if (Array.isArray(data) && data.length > 0) {
          this.list = this.list.concat(data.map(item => {
            let isLike = false;
            let obj: any = {
              id: item.id,
              name: item.senderName,
              photo: HTTP_URL.MAIN + '/images/' + item.photoPath,
              content: item.content,
              isSelf: item.senderId === this.user.id,
              senderId: item.senderId,
              userId: this.user.id,
              pictures: (item.sharePictures || []).map(e => HTTP_URL.MAIN + '/images/' + e.picturePath),
              likes: (item.likeList || []).map(e => { isLike = e.id === this.user.id; return { id: e.id, name: e.zgxm } }),
              comments: (item.shareComments || []).map(e => { return { id: e.id, name: e.commentatorName, content: e.comment, ownerId: e.commentatorId } }),
              timeString: getDateDesc(new Date(item.sendTime.replace(/-/g, '\/')).getTime())
            };
            obj.isLike = isLike;
            return obj;
          }));

        }


        if (callback) {
          return callback(Array.isArray(data) && data.length || 0);
        }
      }, err => {
        this.toastService.show('获取动态失败！');
      });
    // this.list = [{
    //   name: '刘嘉玲',
    //   photo: '',
    //   content: '心情很好很好哦！！！',
    //   isSelf: false,
    //   isLike: false,
    //   pictures: ['','',''],
    //   likes: [{id: 1, name: '小明'},{id: 2, name: 'wangmeili'}],
    //   comments: [{id: 1, name: '莎士比亚', content: '一马当先，吉祥如意'}],
    //   timeString: '8分钟前'
    // }, {
    //   name: '刘嘉玲2',
    //   photo: '发钱啦发钱啦',
    //   content: '',
    //   isSelf: false,
    //   isLike: false,
    //   likes: [],
    //   pictures: ['','',''],
    //   comments: [{id: 1, name: '莎士比亚', content: '一马当先，吉祥如意'}],
    //   timeString: '30分钟前'
    // }, {
    //   name: '刘嘉玲3',
    //   photo: '',
    //   content: '发钱啦发钱啦222222',
    //   isSelf: false,
    //   isLike: false,
    //   likes: [],
    //   pictures: ['','',''],
    //   comments: [],
    //   timeString: '1小时前'
    // }];
  }

  loadMore(event) {
    if (this.pagination.completed) {
      event.complete();
      return;
    }
    this.pagination.pageNo = this.pagination.pageNo + 1;
    this.loadMoments((count) => {
      if (count === 0) {
        this.pagination.completed = true;
      }
      event.complete();
    });
  }

  doRefresh(event) {
    this.resetPagination();
    this.loadMoments(() => {
      event.complete();
    });
  }

  goToNewMoment() {
    this.nav.push('app-contact-newMoment');
  }


  removeMoment(moment, index) {
    console.log(index);
    if (!moment.isSelf) {
      return;
    }
    this.confirmService.show({
      title: '删除动态',
      subTitle: '您确认删除此刻的动态吗？',
      buttons: [
        {
          handler: () => {
          }
        },
        {
          handler: () => {

            this.dynamicNetwork.removeMoment({ contentId: moment.id })
              .subscribe((result: any) => {
                if (result.status === 0) {
                  this.list.splice(index, 1);
                  this.toastService.show('删除成功！');
                }
              }, err => {
                this.toastService.show('删除失败！');
              });
          }
        }
      ]
    });
  }

  showPhotos(pictures, pictureIndex){
    if(!pictures || pictures.length === 0){
      return;
    }

    let prevPictures = pictures.slice(0, pictureIndex);//截出当前图片之前的图片
    let nextPictures = pictures.slice(pictureIndex, pictures.length);//当前图片应该在第一个
    let newPictures = nextPictures.concat(prevPictures);//重新组合最新的图片序列
    this.gallaryService.photoViews(newPictures);

    // photoData = photoData || 'assets/imgs/img-default.png';
    // this.gallaryService.photoViews(photoData,'');
  }
}
