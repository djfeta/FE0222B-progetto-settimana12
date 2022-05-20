import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from 'src/app/models/movie';
import { Preferiti } from 'src/app/models/preferiti';
import { take } from 'rxjs/operators';
import { AuthData, AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  movies: Film[] | undefined;
  preferiti: Film[] | undefined;

  constructor(private http: HttpClient, private authSrv: AuthService) {}

  async loadMovies(): Promise<void> {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    console.log(user.accessToken);

    const movies = await this.http
      .get<Film[]>('http://localhost:4201/api/movies-popular')
      .toPromise();
    console.log(user.accessToken);
    this.movies = movies;
    if (!this.preferiti) {
      this.getFavourite();
    }
  }

  async addFavorite(movie: Film) {
    movie.like = true;
    let count = 0;
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    const data: Preferiti = {
      movieId: movie.id,
      userId: user.user.id,
      id: count++,
    };
    console.log(data);
    return this.http.post<Preferiti>(
      'http://localhost:4201/api/favourites',
      data
    );
  }

  async getFavourite(): Promise<Film[]> {
    let preferitiProvvisorio: Film[] = [];
    this.preferiti = undefined;
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    this.http
      .get<Preferiti[]>(
        `http://localhost:4201/api/favourites?userId=${user.user.id}`
      )
      .subscribe(async (res) => {
        await this.loadMovies();
        console.log(res);
        console.log(this.movies);

        for (let i of res) {
          for (let j of this.movies!) {
            if (i.movieId == j.id) {
              preferitiProvvisorio.push(j);
              preferitiProvvisorio![
                preferitiProvvisorio.indexOf(j)
              ].codicePreferito = i.id;
              j.like = true;
            }
          }
        }
        console.log(this.preferiti);
        this.preferiti = preferitiProvvisorio;
      });
    return preferitiProvvisorio;
  }


  async removeFavourite(movie: Film) {
    const user: AuthData = (await this.authSrv.user$
      .pipe(take(1))
      .toPromise()) as AuthData;
    console.log(user.accessToken);
    movie.like = false;

    this.http
      .delete(`http://localhost:4201/api/favourites/${movie.codicePreferito}`)
      .subscribe();
  }
}
