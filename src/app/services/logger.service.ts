import { Injectable } from '@angular/core';
import {MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor (
    private messageService: MessageService ) { }

    log(message: string) {
        this.messageService.add(`UserService: ${message}`);        
    }
    
    error<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {            
            this.log(`${operation} failed: ${error.message}`)
            return of(result as T);
        }
    }
}