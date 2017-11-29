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
    this.message = this.user.firstName+"'s Pics";
    this.modalTitle = '';
    this.selected = [];
  }

  logout(){
    sessionStorage.removeItem('user');
    this.auth.logout();
  }

  selectAction(id,event){
    var index = this.selected.indexOf(id);
    if (index >= 0) {
      this.selected.splice(index,1);
    } else {
      this.selected.push(id);
    }

    if($(event.target).hasClass('pic-container')){
      $(event.target).toggleClass('active');
    } else {
      $(event.target).parent().toggleClass('active');
    }
  }


  createPic(){	
    this.picObj = {
      name: "",
      userID: this.user._id,
    }
    this.modalTitle = 'New Pic';
    $('#mainModal').modal();
  }

  deletePics(){

    for(var i = 0, l = this.selected.length; i < l; i ++) {
      this.pics.deletePic(this.selected[i]);
    }
    this.selected = [];
  }

  changeFiles(){
    this.filesToUpload = new Array(); 
    this.filesToUpload.push(this.files[0]);
  }
   removeFile(index){
    this.filesToUpload.splice(index,1);
  }

  async savePic(close){
    if(this.picObj){   
      let response = await this.pics.save(this.picObj);
      if(response.error){
        alert("There was an error creating the Pic");
      } else {
        var picId = response._id;
        if(this.filesToUpload && this.filesToUpload.length){
          console.log('adsd');
          await this.pics.uploadFile(this.filesToUpload, this.user._id, picId);
          this.filesToUpload = [];
        }
      }
    }
    if (close) {
      $('#mainModal').modal('toggle');
    }
  }

  async activate(){
    await  this.pics.getUserPics(this.user._id);
  }



}