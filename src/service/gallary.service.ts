import { Injectable } from "@angular/core";
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';


@Injectable()
export class GallaryService {
  constructor(public modalCtrl: ModalController) {

  }
    /**
     * (单图)多图预览model组件封装
     * @param photoData 输入图片地址
     * @param {string} key 对象图片url对应的属性名程
     */
    public photoViews(photoData,key = ''){
        let photos:Array<object> = [];
        let obj = {};
        // 单张图片时（photoData为一个图片地址字符串且不为空）
        if(photoData && typeof(photoData) == "string"){
            obj = {};
            obj['url'] = photoData;
            photos.push(obj);
        }
        console.log(photoData)

        // 多张图片时（photoData为图片地址字符串数组）
        if(photoData instanceof Array){
            console.log(photoData)
            photoData.forEach(function(item,index,array){
                obj = {};
                // photoData 为字符串数组时（即key不存在时）
                if(key == '' && item){
                    obj['url'] = item;
                    photos.push(obj);
                }
                // photoData 为对象数组时（即key存在时）
                console.log(item[key])
                if(key != '' && item[key]){
                    obj['url'] = item[key];
                    photos.push(obj);
                }
            });
        }
        let modal = this.modalCtrl.create(GalleryModal, {
            photos: photos,
            initialSlide: 0
        });
        modal.present();
    }
}





