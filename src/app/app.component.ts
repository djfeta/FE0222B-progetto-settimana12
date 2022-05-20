import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-navbar></app-navbar>
  <div id="sfondo">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [`

  #sfondo {
      background-image: url("../assets/popcorn.jpg");
      background-position: center;
      text-align: center;
      height: 500vh;
    }
  `]
})
export class AppComponent {
  constructor(){

  }
}
