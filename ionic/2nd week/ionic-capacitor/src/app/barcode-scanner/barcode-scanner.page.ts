import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
} from '@capacitor-mlkit/barcode-scanning';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.page.html',
  styleUrls: ['./barcode-scanner.page.scss'],
  standalone: true,
  imports: [
    JsonPipe,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonList,
    IonIcon,
  ],
})
export class BarcodeScannerPage implements OnInit {
  data?: Barcode;
  installed = false;

  async ngOnInit() {
    const resp = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    if(!resp.available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      this.installed = true;
    }
  }

  async scan() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [
        BarcodeFormat.QrCode,
        BarcodeFormat.Codabar,
        BarcodeFormat.Code39,
        BarcodeFormat.Code93,
        BarcodeFormat.Code128,
        BarcodeFormat.Ean8,
        BarcodeFormat.Ean13,
        BarcodeFormat.UpcA,
        BarcodeFormat.UpcE,
        BarcodeFormat.Itf,
      ],
    });
    this.data = barcodes[0];
  }
}
