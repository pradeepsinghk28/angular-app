import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../model/hero';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private logger: LoggerService,
    private http: HttpClient) { }

    //172.22.0.4
    //'http://api:8000/users';  
  private heroesApiUrl= 'api/heroes'; 
  private heroesUrl= 'api/heroes';

  getHeroes(): Observable<Hero[]> {    
    return this.http.get<Hero[]>(this.heroesApiUrl)
      .pipe(
        tap(heroes => this.logger.log(`fetched heroes ${heroes.length}`)),
        catchError(this.logger.error('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.logger.log(`fetched hero id = ${id}`)),
        catchError(this.logger.error<Hero>(`getHero id = ${id}`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.logger.log(`Added Hero id: ${hero.id}`)),
        catchError(this.logger.error<Hero>('addHero'))
      )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.logger.log(`updated Hero id: ${hero.id} `)),
        catchError(this.logger.error<any>('updateHero'))
      )
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const heroId = typeof hero == 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${heroId}`;
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.logger.log(`Deleted Hero id: ${heroId}`)),
        catchError(this.logger.error<Hero>('deleteHero'))
      )
  }

  searchHeroes(term:string):Observable<Hero[]>{
    if(!term.trim())
    {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?firstName=${term}`)
    .pipe(
      tap((heroes: Hero[]) =>{
        heroes.length > 0 ? this.logger.log(`Found Heroes matching "${term}"`): this.logger.log('No record found.')
      }), 
      catchError(this.logger.error<Hero[]>('SearchHeroes', []))
    );
  }  
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
