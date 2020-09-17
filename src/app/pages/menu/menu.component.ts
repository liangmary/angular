import { Component, Input } from '@angular/core';
import { BaseService } from '../../service/base.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private service :BaseService){

  }

  mode = false;
  dark = false;
  @Input() menus:any;

  onOpen(menu:any){
    this.service.navigate(menu.link);
  }

}
