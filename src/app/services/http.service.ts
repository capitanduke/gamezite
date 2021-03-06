import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game, GameTrailer } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string,
    nextPage?: string,
    prevPage?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);


    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    if(nextPage){
      return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?${nextPage}`, {
        params: params,
      });
    }

    if(prevPage){
      return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?${prevPage}`, {
        params: params,
      });
    }


    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<any>{
     return this.http.get(`${env.BASE_URL}/games/${id}`);
  }

  getGameDetailsTrailer(id: string): Observable<any>{
    return this.http.get(`${ env.BASE_URL }/games/${ id }/movies`);
  }

  /*getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,+
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }*/
}