import { Injectable } from '@angular/core';
import { BaseService } from '../../service/base.service';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  private getQRUrl:string = 'doctor/generatCodes';

  constructor(private service:BaseService) { }

  public getQR(SYS_USER_ID:string){

    return this.service.send(this.getQRUrl,{SYS_USER_ID:SYS_USER_ID})

  }
}
