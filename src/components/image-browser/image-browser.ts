import { Component } from '@angular/core';

/**
 * Generated class for the ImageBrowserComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'image-browser',
  templateUrl: 'image-browser.html'
})
export class ImageBrowserComponent {

  text: string;

  constructor() {
    console.log('Hello ImageBrowserComponent Component');
    this.text = 'Hello World';
  }

}
