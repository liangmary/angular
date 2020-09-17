import { Component, OnInit, Input } from '@angular/core';
import { QrcodeService } from './qrcode.service'
interface QRdata{
  isVisible:boolean,
  SYS_USER_ID:string
}

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QRcodeComponent implements OnInit {

  @Input() data:QRdata

  url:string;

  constructor(private service:QrcodeService) { }

  ngOnInit() {
  }

  showQR(){
    this.data.isVisible=true;
  }

  QRhandleCancel(){
    this.data.isVisible=false;
  }

  onOpen(){
    this.service.getQR(this.data.SYS_USER_ID).subscribe(data=>{
      this.url = 'test'+data.path;
      console.log(this.url);
    })

    let _this=this

   // var t2 = window.setInterval(()=>this.hello(),3000); 
  }

  hello(){
    console.log('asdf');
  }
}
