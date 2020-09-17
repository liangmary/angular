import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  @Input() visible:boolean
  @Output() imgBase64 = new EventEmitter<any>();

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor() { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  QRhandleCancel(){
    this.visible=false;
  }

  getFile(inputFile:HTMLInputElement){
    inputFile.click();
  }
  confim(){

    this.imgBase64.emit(this.croppedImage);

  }
}
