import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRcodeComponent } from './qrcode.component';

describe('QRcodeComponent', () => {
  let component: QRcodeComponent;
  let fixture: ComponentFixture<QRcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
