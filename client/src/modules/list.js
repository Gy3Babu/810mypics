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

  logout(){
  	this.router.navigate('home');
  }

  createPic(){	
    this.picObj = {
      file: "",
      userId: 0,//this.user._id,
    }
  	this.showList = false;		
  }

  async savePic(){
    if(this.picObj){   
      let response = await this.pics.save(this.picObj);
      if(response.error){
        alert("There was an error creating the Pic");
      } else {
        //Could provide feeback                 
      }
      this.showList = true;
    }
  }

  async activate(){
    await  true //this.pics.getUserTodos(this.user._id);
  }



}