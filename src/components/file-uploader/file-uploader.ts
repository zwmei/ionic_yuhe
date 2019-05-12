import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isEmpty } from 'lodash';
import { LoadingService } from '../../service/loading.service';
import { UserNetwork } from '../../network/user.network';



@Component({
  selector: 'app-file-uploader',
  template: `
    <div class="component-view-file-upload">
      <input type="file" accept="image/*" capture="camera" multiple id="upload" (change)="changeFile($event)"/>
      <ion-icon name="add"></ion-icon>
    </div>
  `
})
export class FileUploaderComponent {
  @Input() styleInfo: object;
  @Output() onChange = new EventEmitter<string>();

  constructor(
    public loading: LoadingService,
    public userNetwork: UserNetwork,
  ) {
  }

  changeFile(event) {
    console.log('file event1', event);

    let files = event.target.files;
    if (isEmpty(files)) {
      return;
    }
    let file = files[0];
    event.target.value = "";

    this.loading.show();
    this.userNetwork.uploadFile(file).subscribe((a: any) => {
      this.loading.hide();
      if (a.status) {
        return;
      }
      this.onChange.emit(a.result.fileName);
    }, err => {
      this.loading.hide();
    });
  }
}
