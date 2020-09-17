import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  @Input()data:any;
  @Input()ifupdate:any

  show=false;
  
  public uploadVideoUrl:string="test/doctor/uploadVideo";
  public uploadVideoImgUrl:string="test/doctor/uploadvedioimg";
  public uploadImgUrl:string="test/doctor/uploadImg";

  constructor() {}

  ngOnInit(): void {

  }

}
