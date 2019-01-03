import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService} from './user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: User[];
  displayedColumns: string[] = ['firstName', 'lastName', 'mobileNo', 'emailId', 'actions']; 
  dataSource = new MatTableDataSource<User>() 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute, 
    private location: Location ) { }

  ngOnInit() {
    this.getAllUsers();
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers() : void {
    this.users = this.route.snapshot.data.users;    
    this.dataSource.data = this.users;    
  }

  addUser(user: User) : void {
    this.userService.addUser(user)
    .subscribe(()=>{
      this.goBack();
    })
  }

  deleteUser(user: User) : void {
    this.userService.deleteUser(user.id)
    .subscribe(()=>{
      this.users = this.users.filter(x=>x!= user);
      this.dataSource.data = this.users;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
