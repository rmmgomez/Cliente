import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Directory,
  Encoding,
  FileInfo,
  Filesystem,
} from '@capacitor/filesystem';
import {
  AlertController,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-filesystem',
  templateUrl: './filesystem.page.html',
  styleUrls: ['./filesystem.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonInput,
    IonTextarea,
    IonItem,
    IonButton,
    IonListHeader,
    IonLabel,
  ],
})
export class FilesystemPage implements OnInit {
  files: FileInfo[] = [];

  filename = '';
  filetext = '';

  #alertCtrl = inject(AlertController);

  ngOnInit() {
    this.loadFiles();
  }

  async loadFiles() {
    const result = await Filesystem.readdir({
      path: '',
      directory: Directory.Documents,
    });
    this.files = result.files;
  }

  async createFile() {
    const result = await Filesystem.writeFile({
      path: this.filename,
      data: this.filetext,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    this.filename = '';
    this.filetext = '';

    this.loadFiles();
  }

  async readFile(file: FileInfo) {
    if (file.type !== 'file') return;

    const result = await Filesystem.readFile({
      path: file.name,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    const alert = await this.#alertCtrl.create({
      header: file.name,
      message: result.data as string,
    });
    alert.present();
  }

  async deleteFile(file: FileInfo) {
    if (file.type === 'file') {
      await Filesystem.deleteFile({
        path: file.name,
        directory: Directory.Documents,
      });
    } else {
      await Filesystem.rmdir({
        path: file.name,
        directory: Directory.Documents,
        recursive: true,
      })
    }

    this.loadFiles();
  }
}
