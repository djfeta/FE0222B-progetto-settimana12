import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { MovieService } from '../movies/movies.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  template: `
    <div class="container text-white">
      <ul class="list-group">
        <p class="mt-4">Utente: {{welcomeUser}}</p>
        <li *ngFor="let preferito of preferiti">Lista preferiti: {{preferito.title}}</li>
      </ul>
      <hr />
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [],
})

export class PreferitiPage implements OnInit {
  welcomeUser!: string | undefined;
  users!: User[];
  preferiti = this.movieSrv.preferiti;
  constructor( private authSrv: AuthService, private movieSrv: MovieService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.preferiti = this.movieSrv.preferiti;
    }, 20);
    this.authSrv.user$.subscribe((data) => {
      this.welcomeUser = data?.user.name;
      this.movieSrv.getFavourite();
    });
  }
}
