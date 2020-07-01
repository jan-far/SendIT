import moment from 'moment';
import { v4 as uuid } from 'uuid';

class Parcel {
  
  constructor() {
    this.parcel = [];
  }
  
  create(data, user) {;
    const newParcel = {
      id: uuid(),
      email: data.email || '',
      weight: data.weight || '',
      destination: data.destination || '',
      phoneNo: data.phone || '',
      Owner: user.id,
      createdDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.parcel.push(newParcel);
    return newParcel
  }
  
  findOne(id) {
    return this.parcel.find(reflect => reflect.id === id);
  }
  
  findAll() {
    return this.parcel;
  }
  
  update(id, data) {
    const Parcel = this.findOne(id);
    const index = this.parcel.indexOf(Parcel);
    this.parcel[index].email = data['email'] || Parcel.email;
    this.parcel[index].weight = data['weight'] || Parcel.weight;
    this.parcel[index].destination = data['destination'] || Parcel.destination;
    this.parcel[index].phoneNo = data['phoneNo'] || Parcel.phoneNo;
    this.parcel[index].modifiedDate = moment.now()
    return this.parcel[index];
  }
  
  delete(id) {
    const Parcel = this.findOne(id);
    const index = this.parcel.indexOf(Parcel);
    this.parcel.splice(index, 1);
    return {};
  }
}
export default new Parcel();