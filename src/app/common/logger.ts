import {MessageService } from '../messages/message.service';
import { Observable, of } from 'rxjs';

export class logger {

    constructor(
        private messageService: MessageService 
    ){}

    public log(message: string) {
        this.messageService.add(`UserService: ${message}`);
    }
    
    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            this.log(`${operation} failed: ${error.message}`)
            return of(result as T);
        }
    }
}