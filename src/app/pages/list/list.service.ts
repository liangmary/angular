import {Injectable} from '@angular/core';
import {BaseService} from '../../service/base.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private getListUrl: string = 'doctor/getDoctorList';
  private disableUrl: string = 'doctor/nukeDoctor';
  private updateListUrl: string = 'doctor/updateDoctor';
  private addListUrl: string = 'doctor/saveDoctor';
  public static updateUrl: string = 'test/doctor/uploadImg';

  constructor(private service: BaseService) {

  }

  public getList() {

    return this.service.send(this.getListUrl, {keyword: ''});
  }

  public disable(data: any) {
    return this.service.send(this.disableUrl, data);
  }

  updateList(data: any) {

    let _this = this;

    return this.service.send(this.updateListUrl, data).pipe(
      tap((data: any) => {
        if (data.code == '0') {
          _this.service.createMessage('success', '修改成功');
        } else {
          _this.service.createMessage('error', '修改失败');
        }

      }),
    );
  }

  setObj(a: any, b: any) {
    this.service.setObj(a, b);
  }

  addList(data: any) {

    let _this = this;

    return this.service.send(this.addListUrl, data).pipe(
      tap((data: any) => {
        if (data.code == '0') {
          _this.service.createMessage('success', '新增成功');
        } else {
          _this.service.createMessage('error', '新增失败');
        }
      })
    );
  }

  public queryParamMap() {
    return this.service.queryParamMap();
  }
}
