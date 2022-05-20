import { Component, OnInit } from '@angular/core';
import { MovieService } from './movies.service';
import { Film } from 'src/app/models/movie';
/* import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs'; */

@Component({
  template: `
    <h3 class="text-center text-white mt-4" *ngIf="!movies">Loading...</h3>
    <div class="row justify-content-center">
      <div *ngFor="let movie of movies" class="card col-sm-4 text-center m-4" id="filmCard">
        <img class="img-fluid rounded" srcset="http://image.tmdb.org/t/p/w500{{movie.poster_path}}"/>
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p><b>{{ movie.release_date }}</b></p>
        </div>

        <div *ngIf="preferiti">
              <svg *ngIf="movie.like" (click)="unlike(movie)" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
              </svg>
              <svg *ngIf="!movie.like" (click)="like(movie)" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
        </div>
        <div *ngIf="!preferiti">
            <p>Loading...</p>
        </div>

      </div>
    </div>



  `,
  styles: [`
  #filmCard{
    background-color:rgba(184, 184, 192, 0.7);
    width: 20rem;
    max-height: 650px;
    overflow: auto;
    /* overflow-y: scroll; */
  }

  `],
})

export class MoviesPage implements OnInit {
  constructor(private movieSrv: MovieService) {}
  movies: Film[] | undefined;
  preferiti: Film[] | undefined;
  ngOnInit(): void {
    setInterval(() => {
      this.movies = this.movieSrv.movies;
      this.preferiti = this.movieSrv.preferiti;
    }, 20);
    if (!this.movieSrv.movies) {
      this.movieSrv.loadMovies();
    }
  }

  async like(movie: Film) {
    await (await this.movieSrv.addFavorite(movie)).toPromise();
  }

  unlike(movie: Film) {
    this.movieSrv.removeFavourite(movie);
  }
}
