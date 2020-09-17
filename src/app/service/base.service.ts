import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlService} from './url.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router, ActivatedRoute} from '@angular/router';
import {tap, catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  private accessToken: string;

  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(accessToken: string): void {
    this.isLoggedIn = true;
    this.setAccessToken(accessToken);
    this.navigate(this.redirectUrl ? this.redirectUrl : '/pages');
  }

  logout(): void {
    this.isLoggedIn = false;
    this.removeAccessToken();
    this.navigate('/login');
  }

  public get(url: string) {
    return this.http.get(UrlService.serverAddress + url);
  }

  public post(url: string, body?: any) {

    const httpParams = new HttpParams({
      fromObject: body
    });

    return this.http.post(UrlService.serverAddress + url, httpParams).pipe(
      catchError(this.handleError('', []))// then handle the error
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.createMessage('error', '网络出错');

      return of(result as T);
    };
  }

  public put(url: string, body: any) {
    return this.http.put(UrlService.serverAddress + url, body);
  }

  public delete(url: string) {
    return this.http.delete(UrlService.serverAddress + url);
  }

  /**
   * @param type success|error|warning
   * @param msg 要显示的内容
   */
  public createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }

  public navigate(url: string, obj?: object) {
    return this.router.navigateByUrl(url, {
      queryParams: obj
    });
  }

  public queryParamMap() {
    return this.route.queryParamMap;
  }

  public setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);

  }

  public removeAccessToken() {
    this.accessToken = null;
    localStorage.clear();
  }

  public send(url: string, body?: any) {
    let _this = this;

    if (body) {
      body.access_token = this.accessToken;
      console.log('access_token' + body.access_token);

    } else {
      body = {
        access_token: this.accessToken
      };
    }
    return this.post(url, body).pipe(
      tap((data: any) => {
        if (data.msg == '证书无效') {
          _this.createMessage('error', '登录状态失效');
          _this.logout();
        }

      }),
    );
  }


  /**
   * 将B对象同步到A对象
   * B不得为多层
   */
  public setObj(a: object, b: object) {

    for (var key in b) {
      a[key] = b[key];
    }

  }

  public getToken(): string {
    return this.accessToken;
  }

}
