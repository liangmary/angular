参考：[ngx-image-cropper](https://github.com/Mawi137/ngx-image-cropper)
调用方式:
```html
<app-image-cropper [visible]="boolean" (imgBase64)="yourmethod($event)"></app-image-cropper>
```
```typescript
yourmethod(anyName:string){
    console.log(img);
    //do what you want
}
```