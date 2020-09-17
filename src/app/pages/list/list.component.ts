import {Component, OnInit} from '@angular/core';
import {ListService} from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public isSpinning = false;
  public dataSet: [];
  public action = ListService.updateUrl;

  constructor(private service: ListService) {
  }

  ngOnInit() {
    this.doSearch();

  }

  /**
   * 获取列表数据
   */
  doSearch() {
    this.isSpinning = true;
    this.service.getList().subscribe((data: any) => {
        this.dataSet = data.data.list;
        this.isSpinning = false;
      },
      error => {
        console.log(error);
        this.isSpinning = false;
      }
    );
  }

  /**
   * 修改医生状态
   */
  public disable(data: any) {

    data.NUKE = (data.NUKE == 0 ? 1 : 0);

    this.service.disable(data).subscribe((data: any) => {


      }, // success path
      error => {
        console.log(error);
      } // error path
    );
  }

  isVisibleMiddle = {
    ifShow: false,
    flag: ''
  };
  // 是否显示遮罩层
  data: any; // 遮罩层内数据
  tmpData: any; // 缓存数据

  showModalMiddle(data: any): void {
    this.isVisibleMiddle.ifShow = true;
    this.data = JSON.parse(JSON.stringify(data)); // 克隆对象
    this.tmpData = data;
    this.isVisibleMiddle.flag = '更新数据';
  }

  handleOkMiddle(): void {

    let _this = this;

    if ( this.isVisibleMiddle.flag === '更新数据') {
      this.service.updateList(this.data).subscribe((data: any) => {
          if (data.code === '0') {
            _this.service.setObj(this.tmpData, this.data);
            _this.isVisibleMiddle.ifShow = false;
          }

        }, // success path
        error => {
          console.log(error);
        } // error path);
      );
    } else {

      this.service.addList(this.data).subscribe(data => {

        if (data.code === '0') {
          _this.ngOnInit();
          _this.handleCancelMiddle();
        }
      });
    }
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle.ifShow = false;
  }

  addList() {

    var data = {};

    this.isVisibleMiddle.ifShow = true;
    this.data = JSON.parse(JSON.stringify(data)); // 克隆对象
    this.tmpData = data;
    this.isVisibleMiddle.flag = '新增数据';
  }

  QRdata = {
    isVisible: false,
    SYS_USER_ID: ''
  };

  showQR(SYS_USER_ID: string) {
    this.QRdata.SYS_USER_ID = SYS_USER_ID;
    this.QRdata.isVisible = true;
  }

  finish(a: string) {
    console.log(a);
  }

}
