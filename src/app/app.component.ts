import {Component, OnInit} from '@angular/core';
import {BaseService} from './service/base.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private service: BaseService) {
  }

  ngOnInit(): void {

    const accessToken = localStorage.getItem('accessToken');

    if ( accessToken) {
      this.service.login(accessToken);
    }
  }
}
