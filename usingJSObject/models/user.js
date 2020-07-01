import moment from 'moment';
import { v4 as uuid } from 'uuid';
import help from '../controller/helper';

class User {
  constructor() {
    this.user = [];
  }
  
  create(data) {
    const hashed = help.hashPassword(data.password)
    const newUser = {
      id: uuid(),
      firstName: data.firstname,
      lastName: data.lastname ,
      email: data.email,
      password: hashed,
      phoneNo: data.phone,
      RegisteredDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.user.push(newUser);
    console.log(newUser)
    return newUser
  }
  
  findOne(id) {
    return this.user.find(reflect => reflect.id === id);
  }
  
  findAll() {
    return this.user;
  }
  
  update(id, data) {
    const User = this.findOne(id);
    const index = this.user.indexOf(User);
    this.user[index].email = data['email'] || User.email;
    this.user[index].weight = data['weight'] || User.weight;
    this.user[index].destination = data['destination'] || User.destination;
    this.user[index].phoneNo = data['phoneNo'] || User.phoneNo;
    this.user[index].modifiedDate = moment.now()
    return this.user[index];
  }
  
  delete(id) {
    const User = this.findOne(id);
    const index = this.user.indexOf(User);
    this.user.splice(index, 1);
    return {};
  }
}

export default new User();