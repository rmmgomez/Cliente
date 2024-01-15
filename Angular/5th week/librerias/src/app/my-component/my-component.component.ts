import { Component } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [SweetAlert2Module],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.css'
})
export class MyComponentComponent {
  sayHello(name: string) {
    console.log("Hello " + name);
  }

  cancelHello() {
    console.log("Cancelled!");
  }
}
