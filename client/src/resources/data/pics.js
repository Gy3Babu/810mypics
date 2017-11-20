import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

 @inject(DataServices)
export class Pics {
  constructor(data) {
    this.data = data;
    this.PIC_SERVICE = 'pics';
    this.picsArray = [];
  }

  async save(pic){
    if(pic){
      let response = await this.data.post(pic, this.PIC_SERVICE +"/" + pic._id);

      if(! serverResponse.error){
        this.picsArray.push(serverResponse);
      }
      return response;
    }
  }

  async getUserPics(id){
    let response = await this.data.get(this.PIC_SERVICE + "/user/" + id);
    if(!response.error && !response.message){
      this.picsArray = response;
    }
  }
}
