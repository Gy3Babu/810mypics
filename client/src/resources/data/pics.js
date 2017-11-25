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
    if(!pic._id){
      let response = await this.data.post(pic, this.PIC_SERVICE);

      if(!response.error){
        this.picsArray.push(response);
      }
      return response;
     } else {
      let response = await this.data.put(todo, this.TODOS_SERVICE + "/" + todo._id);

      if(!response.error){
        // this.updateArray(response);
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

  async uploadFile(files, userId, picId){
    let formData = new FormData();
     files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.PIC_SERVICE +   "/upload/" + userId + "/" + picId);
    return response;
  }

  async deletePic(id){
    let response = await this.data.delete(this.PIC_SERVICE + "/" + id);
      if(!response.error){
        for(let i = 0; i < this.picsArray.length; i++){
        if(this.picsArray[i]._id === id){
          this.picsArray.splice(i,1);
        }
      }
    }
  }



}
