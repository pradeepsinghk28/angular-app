import { TestBed, inject } from '@angular/core/testing';
import { TestModule } from '../../test.module';
import { UserService } from './user.service';
import { LoggerService } from '../services/logger.service';
import { DataService } from '../services/data.service';
import { User } from '../model/user';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { USE_VALUE } from '@angular/core/src/di/injector';

describe('UserService', () => {
  let userService: UserService;
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  
  const user1: User = {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    gender: 'male',
    mobileNo: 9999999999,
    emailId: 'test@gmail.com',
    address: 'Test Address',
    dateOfBirth: new Date('2001-11-02T18:30:00.000Z')
  };

  const user2: User  = {
    id: 2,
    firstName: 'Test',
    lastName: 'User1',
    gender: 'female',
    mobileNo: 8888888888,
    emailId: 'test1@gmail.com',
    address: 'Test1 Address',
    dateOfBirth: new Date('2000-10-01T18:30:00.000Z')
  }

  const users: User[] = [user1, user2]

  beforeEach(() => { debugger;
    let loggerSpy = jasmine.createSpyObj('LoggerService', ['log', 'error']);
    let dataSpy = jasmine.createSpyObj('DataService', ['get', 'post'])

    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [UserService,
        { provide: LoggerService, useValue: loggerSpy },
        { provide: DataService, useValue: dataSpy }
      ]
    });

    userService = TestBed.get(UserService);
    loggerServiceSpy = TestBed.get(LoggerService);
    dataServiceSpy = TestBed.get(DataService);
  });

  it('should be created', inject([UserService], (service: UserService) => {
      expect(service).toBeTruthy();      
    }));
   
  it('getAllUsers should return all the users', () => {
    dataServiceSpy.get.and.returnValue(of(users));
    userService.getAllUsers().subscribe(
      data => {
        expect(data).toEqual(jasmine.any(Object));
        expect(dataServiceSpy.get).toHaveBeenCalledTimes(1);
        expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
      });
  });

  it('test UTC', ()=>{
        expect(1).toEqual(1);
  });

  // it('getUser should return the user', () => {
  //   dataServiceSpy.get.and.returnValue(of(user1));
  //   userService.getUser(1).subscribe(
  //     data => {
  //       expect(data).toEqual(jasmine.any(Object));
  //       expect(dataServiceSpy.get).toHaveBeenCalledTimes(1);
  //       expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1);
  //     });
  // });
});
