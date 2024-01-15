import { Component, inject } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faStar as faStarSolid, faSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-my',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './my.component.html',
  styleUrl: './my.component.css'
})
export class MyComponent {
  icons = { faCoffee, faStarSolid, faStarRegular, faSquare, faSpinner };
  #faIconLibrary = inject(FaIconLibrary);

  constructor() {
    this.#faIconLibrary.addIcons(faCoffee, faStarSolid, faStarRegular, faSquare, faSpinner);
  }
}
