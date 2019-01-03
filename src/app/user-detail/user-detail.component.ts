import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user/user.service';
import { User } from '../model/user';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User;
  userForm = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    emailId: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  })

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.getUser();
      }
    })
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        this.userForm.setValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          mobileNo: user.mobileNo,
          emailId: user.emailId,
          address: user.address,
          dateOfBirth: user.dateOfBirth
        });
      });
  }


  goBack(): void {
    debugger;
    this.location.back();
  }

  save(): void {
    this.user = this.userForm.value;
    if (this.user.id) {
      this.userService.updateUser(this.user)
        .subscribe(() => this.goBack());
    }
    else{
      this.user.id = null;
      this.userService.addUser(this.user)
      .subscribe(()=> this.goBack());
    }
  }
}
