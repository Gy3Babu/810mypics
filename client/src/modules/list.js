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
    this.gallerySelected = false;
    this.selected = [];
    this.filesToUpload = [];
    this.fileDescription = '';
    this.filename = '';
  }

  selectGallery(pic){
    this.gallerySelected = pic;
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

  createImages(){

    if (this.gallerySelected) {
      this.picObj = this.gallerySelected
      this.modalTitle = 'Add Image';
      this.fileDescription = '';
      $('#addPicture').modal();
    } else{
      alert('Select a gallery');
    }
  }

  editImage(image){
    this.fileDescription = image.description;
    this.filename = image.filename;
    this.modalTitle = 'Edit Image';
    $('#addPicture').modal();
  }

  deleteImages(){
    for(var i = 0, l = this.selected.length; i < l; i ++) {
      var reponse = this.pics.deleteImages(this.selected,this.gallerySelected._id);
    }

    this.selected = [];
    window.location.reload()
  }

  async saveImages(){
    if(this.filesToUpload && (this.filesToUpload.length || this.filename != '')){
      await this.pics.uploadFile(this.filesToUpload, this.fileDescription, this.filename, this.user._id, this.gallerySelected._id);
      this.filesToUpload = [];
    }
    $('#addPicture').modal('toggle');
    window.location.reload()
  }


  createPic(){	
    this.picObj = {
      name: "",
      userID: this.user._id,
    }
    this.modalTitle = 'New Pic';
    $('#mainModal').modal();
    this.filename = '';
  }


  editPic(pic){  
    this.picObj = pic;
    this.modalTitle = 'Edit Pic';
    $('#mainModal').modal();
  }

  deleteGallery(pic){
    this.pics.deletePic(pic._id);
    this.gallerySelected = false;
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
      }
      if (close) {
        $('#mainModal').modal('toggle');
      }
    }
  }

  async activate(){
    await  this.pics.getUserPics(this.user._id);
  }

}