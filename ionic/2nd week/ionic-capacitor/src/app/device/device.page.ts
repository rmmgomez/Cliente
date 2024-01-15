import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { BatteryInfo, Device, DeviceInfo } from '@capacitor/device';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-device',
  templateUrl: './device.page.html',
  styleUrls: ['./device.page.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
  ],
})
export class DevicePage implements OnInit {
  info!: DeviceInfo;
  battery!: BatteryInfo;

  async ngOnInit() {
    this.info = await Device.getInfo();
    this.battery = await Device.getBatteryInfo();
  }
}
