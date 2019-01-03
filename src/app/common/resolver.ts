import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { User } from '../model/user';


@Injectable({
    providedIn: 'root'
})

export class ResolverService implements Resolve<User[]>{

    constructor(private userService: UserService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]>{

        return this.userService.getAllUsers();
    }
}
