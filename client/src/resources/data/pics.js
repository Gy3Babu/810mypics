import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

 @inject(DataServices)
export class Pics {
  constructor(data) {
    this.data = data;
    this.PIC_SERVICE = 'pics';
    this.picsArray = [];
  }


  updateArray(pic){
    for(var i = 0, l = this.picsArray.length; i < l; i++ ){
      if (this.picsArray[i]._id == pic._id){
        this.picsArray[i] = pic;
        break;
      }
    }
    this.picsArray.push(this.picsArray.pop())
  }


  async save(pic){
    if(!pic._id){
      let response = await this.data.post(pic, this.PIC_SERVICE);

      if(!response.error){
        this.picsArray.push(response);
      }
      return response;
     } else {
      let response = await this.data.put(pic, this.PIC_SERVICE + "/" + pic._id);

      if(!response.error){
        this.updateArray(response);
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
    if(!response.error){
      this.updateArray(response);
    }
    return response;
  }

  async deleteImages(images,id){
    let response = await this.data.post({'images':images},this.PIC_SERVICE + "/" + id+"/images");
    this.updateArray(response);
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
