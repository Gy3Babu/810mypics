import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Pics} from '../resources/data/pics';
import {AuthService} from 'aurelia-auth';

@inject(Pics, AuthService, Router)
export class Wall {
  constructor(pics, auth,router) {
    this.pics = pics;
  	this.router = router;
    this.auth = auth;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.message = "List"
    this.showList = true;
  }

  back(){
   this.showList = true; 
  }


  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
  }

  createPic(){	
    this.picObj = {
      name: "",
      userID: this.user._id,
    }
  	this.showList = false;		
  }

  changeFiles(){
    this.filesToUpload = new Array(); 
    this.filesToUpload.push(this.files[0]);
  }
   removeFile(index){
    this.filesToUpload.splice(index,1);
  }

  async savePic(){
    if(this.picObj){   
      let response = await this.pics.save(this.picObj);
      if(response.error){
        alert("There was an error creating the Pic");
      } else {
        var picId = response._id;
        if(this.filesToUpload && this.filesToUpload.length){
          await this.pics.uploadFile(this.filesToUpload, this.user._id, picId);
          this.filesToUpload = [];
        }
      }
      this.showList = true;
    }
  }

  async activate(){
    await  this.pics.getUserPics(this.user._id);
  }



}