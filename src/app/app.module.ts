import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN , NZ_ICON_DEFAULT_TWOTONE_COLOR , NZ_ICONS} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { PagesComponent } from './pages/pages.component';
import { ListComponent } from './pages/list/list.component';
import { HeadComponent } from './pages/head/head.component';
import { AddListComponent } from './pages/list/add-list/add-list.component';
import { UploadComponent } from './pages/upload/upload.component';
import { QRcodeComponent } from './pages/qrcode/qrcode.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ImageCropperComponent } from './@theme/components/image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AaaComponent } from './pages/aaa/aaa.component';

registerLocaleData(zh);

const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent,
    ListComponent,
    HeadComponent,
    AddListComponent,
    UploadComponent,
    QRcodeComponent,
    MenuComponent,
    ImageCropperComponent,
    AaaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
