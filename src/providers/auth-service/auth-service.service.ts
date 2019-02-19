import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(
    public afAuth: AngularFireAuth,
    public facebook: Facebook,
    public platform: Platform,
  ) 
  {}

  async emailRegister(userValue){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(userValue.email, userValue.password)
      .then(res => {resolve(res);})
      .catch((error) =>{reject(error)});
    })
   }
  
   async emailLogin(userValue){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(userValue.email, userValue.password)
      .then(res => {resolve(res);})
      .catch((error) =>{reject(error)});
    })
   }

   async getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(function(user){
        let userModel = {
          userId: "",
          userName: "",
          userImage: "",
          provider: ""
        };
        if (user) {
           if(!user.photoURL){
              userModel.userId = user.uid;
              userModel.userImage = '../assets/imgs/userImageDefault.png';
              userModel.userName = user.displayName;
              userModel.provider = user.providerData[0].providerId;
              return resolve(userModel);
            }
            else{
              userModel.userId = user.uid;
              userModel.userImage = user.photoURL;
              userModel.userName = user.displayName;
              userModel.provider = user.providerData[0].providerId;
              return resolve(userModel);
            }
 
        } else {reject('error');}
      })
    })
  }

  async updateUserProfiles(value: any){
    return new Promise<any>((resolve, reject) => {
      let user = this.afAuth.auth.currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {resolve(res)})
      .catch((error) =>{reject(error)});
    })
  }
   
  async logout()
  {
    return new Promise((resolve, reject) => {
      if(this.afAuth.auth.currentUser){
        this.afAuth.auth.signOut()
        resolve();
      }
      else{reject();}
    });
  }

  async facebookLogin(){
    return new Promise<any>((resolve, reject) => {
      //user native
      if (this.platform.is('cordova')) {//set if platform == cordova
        this.facebook.login(["public_profile"]).then((response) => {//public profile is array permission, can add more if need
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
          this.afAuth.auth.signInWithCredential(facebookCredential);
          this.facebook.api("/me?fields=name,gender", [])//this line get name and some property
          .then((user) => {resolve({})
          });
        },(error) => {reject(error);});
      }
      else{
        this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((user) => {resolve({})
      })
        .catch((error) =>{
          reject(error)
       });
      }
    })
  }

}
