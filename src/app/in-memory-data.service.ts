import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './model/user';
import { Hero } from './model/hero';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, firstName: 'Nice', lastName:'John' },
      { id: 12, firstName: 'Narco', lastName:'Jovi' },
      { id: 13, firstName: 'Bombasto', lastName:'Micheal' },
      { id: 14, firstName: 'Celeritas', lastName:'dev' },
      { id: 15, firstName: 'Magneta', lastName:'' },
      { id: 16, firstName: 'RubberMan', lastName:'' },
      { id: 17, firstName: 'Dynama', lastName:'' },
      { id: 18, firstName: 'Dr IQ', lastName:'' },
      { id: 19, firstName: 'Magma', lastName:'' },
      { id: 20, firstName: 'Tornado', lastName:'' }
    ];

    const users = [
      {id: 1, firstName: 'Pradeep', lastName: 'Singh', mobileNo: 9877655456, emailId: 'pradeep@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2018-10-09T18:30:00.000Z'},
      {id: 2, firstName: 'Saurabh', lastName: 'Singh', mobileNo: 9877688765, emailId: 'Saurabh@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2001-10-02T18:30:00.000Z'},
      {id: 3, firstName: 'Nikhil', lastName: 'Mangal', mobileNo: 9877877543, emailId: 'Nikhil@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2002-07-09T18:30:00.000Z'},
      {id: 4, firstName: 'Sourabh', lastName: 'Seth', mobileNo: 8766555434, emailId: 'Sourabh@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2018-09-09T18:30:00.000Z'},
      {id: 5, firstName: 'Vinod', lastName: 'Bhatt', mobileNo: 8678766543, emailId: 'Vinod@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2018-10-09T18:30:00.000Z'},
      {id: 6, firstName: 'Amit', lastName: 'Tyagi', mobileNo: 9855655432, emailId: 'Amit@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2018-10-09T18:30:00.000Z'},
      {id: 7, firstName: 'Nitish', lastName: 'Nagrang', mobileNo: 8766566789, emailId: 'Nitish@gmail.com', gender:'Male', address:'Test Address', dateOfBirth: '2018-10-09T18:30:00.000Z'}
    ]
    return {heroes, users};
  }

  genId<T extends Hero | User>(collection: T[]): number {
    return collection.length > 0 ? Math.max(...collection.map(t => t.id)) + 1 : 11;
  }
}