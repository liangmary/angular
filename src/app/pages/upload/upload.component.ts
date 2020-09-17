import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadXHRArgs } from 'ng-zorro-antd';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

  @Input() action:string;
  @Input() id:string;

  showButton=true;

  @Output() finish = new EventEmitter<any>();

  ngOnInit(): void {
  }

  constructor(private http: HttpClient,private service: BaseService) {}

  customReq = (item: UploadXHRArgs) => {

    let _this=this;

    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('access_token', this.service.getToken());
    formData.append('SYS_USER_ID', this.id);
    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          // 处理上传进度条，必须指定 `percent` 属性来表示进度
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          // 处理成功
          item.onSuccess!(event.body, item.file!, event);
        }
        _this.showButton=false;
      },
      err => {
        // 处理失败
        item.onError!(err, item.file!);
      }
    );
  };

}
