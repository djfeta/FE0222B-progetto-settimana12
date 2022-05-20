import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="collapse navbar-collapse justify-content-evenly">
      <ul class="navbar-nav">
      <li class="nav-item" *ngIf="isLoggedIn">
       <a class="nav-link" [routerLink]="['/movies']" routerLinkActive="active">Movies</a>
      </li>
      <li class="nav-item" *ngIf="isLoggedIn">
        <a class="nav-link" [routerLink]="['/preferiti']" routerLinkActive="active">Preferiti</a>
      </li>
      <li class="nav-item" *ngIf="!isLoggedIn">
        <a class="nav-link active" aria-current="page" [routerLink]="['/']" routerLinkActive="active"  [routerLinkActiveOptions]="{ exact: true }">Login</a>
      </li>
      <li class="nav-item" *ngIf="!isLoggedIn">
        <a class="nav-link"  [routerLink]="['/signup']" routerLinkActive="active">Registrati</a>
      </li>
      </ul>
      <div *ngIf="isLoggedIn">
            <p class="d-inline username-welc-back text-white">Bentornato <span class="fst-italic fw-bolder">{{welcomeUser}}</span></p>
            <button class="btn btn-danger mx-3" (click)="onLogout()">Logout</button>
          </div>
    </div>
  </div>
</nav>

  `,
  styles: [`
    .username-welc-back {
      transform: translateY(30%);
    }

    .navbar {
      background-color: #1e0929!important;
    }

  `],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  welcomeUser!: string | undefined;

  constructor(private authSrv: AuthService) {}

  onLogout() {
    this.authSrv.logout();
  }

  ngOnInit(): void {
    this.authSrv.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    })

    this.authSrv.user$.subscribe((data) => {
      this.welcomeUser = data?.user.name;
    })
  }
}
