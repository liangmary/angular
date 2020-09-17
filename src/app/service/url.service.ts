import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  public static serverAddress:string = '/test/';

  constructor() {
  }
}
