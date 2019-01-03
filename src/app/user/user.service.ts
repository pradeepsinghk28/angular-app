import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { User } from '../model/user';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiUrl= 'api/users'; 

  constructor( 
      private logger: LoggerService,
      private dataService: DataService
    ) {}

  getAllUsers(): Observable<User[]> {    
    return this.dataService.get(this.userApiUrl,{})
    .pipe(
      tap(users => this.logger.log('getUsers fetched users count: '+ users)),
      catchError(this.logger.error<User[]>('getUsers', []))
    );
  }
  
  getUser(id: number): Observable<User>{
    const url = `${this.userApiUrl}/${id}`;
    return this.dataService.get(url, {})
    .pipe(
      tap(_=>this.logger.log('getUsers fetched user: '+ _['firstName'])),
      catchError(this.logger.error<User>(`getUser id = ${id}`))
    )
  }
  
  addUser(user: User): Observable<any>{
    return this.dataService.post(this.userApiUrl,user)
    .pipe(
      tap(),
      catchError(this.logger.error<User>('Add user failed'))
    )
  }

  updateUser(user: User): Observable<any>{
    return this.dataService.put(this.userApiUrl,user)
    .pipe(
      tap(),
      catchError(this.logger.error<User>(`updateUser failed for id = ${user.id}`))
    )
  }

  deleteUser(user: User | number): Observable<any>{
    const userId = typeof user == 'number' ? user : user.id; 
    const url = `${this.userApiUrl}/${userId}`;
    return this.dataService.delete(url)
    .pipe(
      tap(_ => this.logger.log(`deleted user with id: ${userId}`)),
      catchError(this.logger.error<User>(`deleteUser id= ${userId}`))
    )
  }  
}