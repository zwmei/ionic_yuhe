import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, App } from 'ionic-angular';
import { MessagePage } from '../message/message';
import { DynamicPage } from '../dynamic/dynamic';
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
import { MePage } from '../me/me';
import { Observable } from 'rxjs/Observable';
import { ChatNetwork } from '../../network/chat.network';
import { StorageService, STORAGE_KEY } from '../../service/storage.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastService } from '../../service/toast.service';

export const MessageType = {
  Text: '11',
  Image: '12',
  PendingApproval: '21', //等待审批的消息
  CCApproval: '31', //抄送审批的消息
  ScheduleReminder: '41', //日程提醒的消息
  NewMail: '51', //新邮件的消息
  ReplyMail: '52', //邮件回复的消息
  NewDynamic: '61', //新动态的消息
}
export const MessageContentType = {
  Text: '1', //文字
  Image: '2' //图片
}

export const ChatType = {
  Chat: 'chat',
  ChatRoom: 'groupchat'
}

export interface MessageContent {
  targetCode: string;
  userCode: string;
  msg: string; //消息内容
  msgContentType: string; //消息内容类型
  msgType: string;//消息类型
  chatType: string;
  timeStr: string;
}

interface IWin extends Window {
  WebIMObserve: any;
  WebIMConn: any;
}
(<IWin>window).WebIMObserve = {};
(<IWin>window).WebIMConn = { close: () => { } };
@IonicPage({
  name: 'app-tab',
  segment: 'tab/:id',
  defaultHistory: ['app-tab']
})
@Component({
  templateUrl: 'tab.html'
})
export class TabPage {
  subscription: Subscription;
  tabIndex = 2;
  tab1 = MessagePage;
  tab2 = ContactPage;
  tab3 = HomePage;
  tab4 = DynamicPage;
  tab5 = MePage;

  badge1: string; //新消息提示
  badge2: string;//新动态提示
  badge3: string;//首页新内容提示

  @ViewChild('mainTabs') tabRef: Tabs;

  constructor(
    // public navCtrl: NavController,
    public app: App,
    public navParams: NavParams,
    public chatNetwork: ChatNetwork,
    public storageService: StorageService,
    public toast: ToastService
  ) {
    //获取默认值
    (<IWin>window).WebIMObserve = new Observable(this.multicastSequenceSubscriber());
    console.log('%ctab构造函数','color:blue;font-size:20px');
  }

  tabChange = (ev: any) => {
    console.log('tab change', ev.tabTitle);
    let a = {
      '消息': 1,
      '动态': 2,
      '主页': 3
    };
    if (a.hasOwnProperty(ev.tabTitle)) {
      this[`badge${a[ev.tabTitle]}`] = '';
    }
  }

  ionViewDidLoad() {
    let tabIndex = parseInt(this.navParams.data.id);

    if (tabIndex !== this.tabIndex) {
      this.tabRef.select(tabIndex);
    }

    this.subscription = (WebIMObserve).subscribe({
      next: (data) => {
        console.log('tab.ts msss==', data);
        let navs = this.app.getActiveNavs();
        let activeVC = navs[0].getActive();

        if (data.msg && data.msgType != MessageType.Text && data.msgType != MessageType.Image) {
          this.toast.show(data.msg);

          if (activeVC.name != 'HomePage') {
            if ([
              MessageType.PendingApproval,
              MessageType.CCApproval
            ].indexOf(data.msgType) >= 0) {
              this.storageService.set(STORAGE_KEY.MESSAGE_TYPE_APPROVAL, true);
              this.badge3 = '1';
            }
            else if ([
              MessageType.NewMail,
              MessageType.ReplyMail
            ].indexOf(data.msgType) >= 0) {
              this.storageService.set(STORAGE_KEY.MESSAGE_TYPE_MAIL, true);
              this.badge3 = '1';
            }
            else if (MessageType.ScheduleReminder == data.msgType) {
              this.storageService.set(STORAGE_KEY.MESSAGE_TYPE_SCHEDULE, true);
              this.badge3 = '1';
            }
          }
          if (MessageType.NewDynamic == data.msgType && activeVC.name != 'DynamicPage') {
            this.badge2 = '1';
          }
        }
        if (data.msgType == MessageType.Text || data.msgType == MessageType.Image) {
          if (['MessagePage', 'ChatPage'].indexOf(activeVC.name) === -1) {
            this.badge1 = '1';
            this.toast.show('你收到一条新消息');
          }
        }
      }
    });
  }
  ionViewWillUnload() {
    console.warn('tab.ts did out unload=======');
    this.subscription && this.subscription.unsubscribe();
    this.subscription = null;
  }

  nextMore(observers: any[], data) {
    observers.forEach((o: any) => o.next(data));
  }
  multicastSequenceSubscriber() {
    const observers = [];
    return (observe) => {
      observers.push(observe);
      console.warn('%%%%%%observe length', observers.length);

      // When this is the first subscription, start the sequence
      let that = this;

      if (observers.length === 1) {
        this.chatNetwork.getChatKey().subscribe((data: any) => {
          if (!data || data.status) return;

          WebIM.config.appkey = data.result.AppKey;

          var conn: any = {};
          conn = new WebIM.connection({
            isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
            https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
            url: WebIM.config.xmppURL,
            isAutoLogin: true,
            heartBeatWait: WebIM.config.heartBeatWait,
            autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
            autoReconnectInterval: WebIM.config.autoReconnectInterval,
            apiUrl: WebIM.config.apiURL
          });

          // listern，添加回调函数
          conn.listen({
            onOpened: function (message) {          //连接成功回调，连接成功后才可以发送消息
              //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
              // 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
              // 所以无需调用conn.setPresence();
              console.log("%c [opened] 连接已成功建立", "color: green");
              that.nextMore(observers, '连接已成功建立!!!')
            },
            onClosed: function (message) {          //连接成功回调，连接成功后才可以发送消息
              //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
              // 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
              // 所以无需调用conn.setPresence();
              console.log("%c [opened] 连接已断开", "color: red");
              that.nextMore(observers, '连接已断开!!!')
            },
            onTextMessage: function (message) {
              // 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
              message.sourceMsg = message.sourceMsg || '';
              if (!message.sourceMsg) {
                return;
              }
              let msgType = message.sourceMsg.slice(0, 2);
              that.nextMore(observers, {
                targetCode: message.to,
                userCode: message.from,
                msg: message.sourceMsg.slice(2),
                msgContentType: (msgType == MessageType.Image ? MessageContentType.Image : MessageContentType.Text),
                msgType: msgType,
                chatType: message.type,
                timeStr: new Date().toISOString()
              } as MessageContent);
            },  //收到文本消息
            onEmojiMessage: function (message) {
              // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
              // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
              // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
              console.log('Emoji');
              var data = message.data;
              for (var i = 0, l = data.length; i < l; i++) {
                console.log(data[i]);
              }
            },   //收到表情消息
            onPictureMessage: function (message) {
              console.log('Picture');

              var options: any = { url: message.url };
              options.onFileDownloadComplete = function () {
                // 图片下载成功
                console.log('Image download complete!');
              };
              options.onFileDownloadError = function () {
                // 图片下载失败
                console.log('Image download failed!');
              };
              WebIM.utils.download.call(conn, options);       // 意义待查

            }, //收到图片消息
            onCmdMessage: function (message) {
              console.log('CMD');
            },     //收到命令消息
            onAudioMessage: function (message) {
              console.log("Audio");
            },   //收到音频消息
            onLocationMessage: function (message) {
              console.log("Location");
            },//收到位置消息
            onFileMessage: function (message) {
              console.log("File");
            },    //收到文件消息
            onVideoMessage: function (message) {
              var node: any = document.getElementById('privateVideo');
              var option = {
                url: message.url,
                headers: {
                  'Accept': 'audio/mp4'
                },
                onFileDownloadComplete: function (response) {
                  var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response);
                  node.src = objectURL;
                },
                onFileDownloadError: function () {
                  console.log('File down load error.')
                }
              };
              WebIM.utils.download.call(conn, option);
            },   //收到视频消息
            onPresence: function (message) {
              switch (message.type) {
                case 'subscribe':                           // 对方请求添加好友
                  // 同意对方添加好友
                  document.getElementById('agreeFriends').onclick = function (message) {
                    conn.subscribed({
                      to: 'asdfghj',
                      message: "[resp:true]"
                    });
                  };
                  // 拒绝对方添加好友
                  document.getElementById('rejectFriends').onclick = function (message: any) {
                    conn.unsubscribed({
                      to: message.from,
                      message: "rejectAddFriend"                  // 拒绝添加好友回复信息
                    });
                  };

                  break;
                case 'subscribed':                          // 对方同意添加好友，已方同意添加好友
                  break;
                case 'unsubscribe':                         // 对方删除好友
                  break;
                case 'unsubscribed':                        // 被拒绝添加好友，或被对方删除好友成功
                  break;
                case 'memberJoinPublicGroupSuccess':                 // 成功加入聊天室
                  console.log('join chat room success');
                  break;
                case 'joinChatRoomFaild':                   // 加入聊天室失败
                  console.log('join chat room faild');
                  break;
                case 'joinPublicGroupSuccess':              // 意义待查
                  console.log('join public group success', message.from);
                  break;
                case 'createGroupACK':
                  conn.createGroupAsync({
                    from: message.from,
                    success: function (option) {
                      console.log('Create Group Succeed');
                    }
                  });
                  break;
              }
            },       //收到联系人订阅请求（加好友）、处理群组、聊天室被踢解散等消息
            onRoster: function (message) {
              console.log('Roster');
            },         //处理好友申请
            onInviteMessage: function (message) {
              console.log('Invite');
            },  //处理群组邀请
            onOnline: function () {
              console.log('onLine');
            },                  //本机网络连接成功
            onOffline: function () {
              console.log('offline');
            },                 //本机网络掉线
            onError: function (message) {
              console.log('Error');
              console.log(message);
              if (message && message.type == 1) {
                console.warn('连接建立失败！请确认您的登录账号是否和appKey匹配。')
              }
            },//失败回调
            onBlacklistUpdate: function (list) {
              // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
              console.log(list);
            },
            onReceivedMessage: function (message) {
              console.log('onReceivedMessage', message);
            },
            onDeliveredMessage: function (message) {
              console.log('onDeliveredMessage', message);
            },
            onReadMessage: function (message) {
              console.log('onReadMessage', message);
            },
            onCreateGroup: function (message) {
              console.log('onCreateGroup', message);
            },
            onMutedMessage: function (message) {
              console.log('onMutedMessage', message);
            }
          });

          let loginInfo = this.storageService.get(STORAGE_KEY.LOGIN_INFO);
          var options = {
            apiUrl: WebIM.config.apiURL,
            user: loginInfo.username,
            pwd: 'ysys02468',
            appKey: WebIM.config.appkey,
            success: function (token) {
              that.nextMore(observers, 'open success!!!!');
              WebIM.config.token = token;
            },
            error: function (err) {
              console.log('open, err', err);
            }
          };
          conn.open(options);

          WebIMConn = conn;
        });
      }
      return {
        unsubscribe() {
          // Remove from the observers array so it's no longer notified
          observers.splice(observers.indexOf(observe), 1);
        }
      };
    };
  }
}
