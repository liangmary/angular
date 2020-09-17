import {Injectable} from '@angular/core';
import {BaseService} from '../../service/base.service';

export interface User {

  userName: string;
  passWD: string;

}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private loginUrl = 'doctor/Login';

  constructor(private service: BaseService) {
  }

  public login(user: User) {

    let body = {
      client_id: user.userName,
      client_secret: user.passWD,
      redirect_uri: '123',
      grant_type: 'authorization_code',
      code: 'code',
    };

    let _this = this;
    console.log('body:', body);
    this.service.post(this.loginUrl, body)
      .subscribe((data: any) => {

          if ( data.code == '11') {
            _this.service.createMessage('error', '用户不存在');
          } else if (data.code == '0') {
            _this.service.createMessage('success', '登录成功');
            _this.service.login(data.accessToken);
          } else {
            _this.service.createMessage('error', '登录失败');
          }
        }, // success path
        error => {
          console.log(error);
        } // error path
      );
  }
}
