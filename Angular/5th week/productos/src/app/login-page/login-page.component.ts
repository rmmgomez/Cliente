import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Subscription } from 'rxjs';
import { GoogleLoginDirective } from '../google-login/google-login.directive';
import { LoadGoogleApiService } from '../google-login/load-google-api.service';
import { FbLoginDirective } from '../facebook-login/fb-login.directive';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'login-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, GoogleLoginDirective, FbLoginDirective],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy{
  #loadGoogle = inject(LoadGoogleApiService);

  iconGoogle = faGoogle;
  credentialsSub!: Subscription;
  iconFacebook = faFacebook;
  
  ngOnInit(): void {
    this.credentialsSub = this.#loadGoogle.credential$.subscribe(
      resp => console.log(resp.credential) // Send this to your back-end
    );
  }

  ngOnDestroy(): void {
      this.credentialsSub.unsubscribe();
  }

  loggedFacebook(resp: fb.StatusResponse) {
    // Send this to your server
    console.log(resp.authResponse.accessToken);
  }

  showError(error: any) {
    console.error(error);
  }
}
