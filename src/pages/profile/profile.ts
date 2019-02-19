import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile_form: FormGroup;
  user: any = {
    userId: "",
    userName: "",
    userImage: "",
  };
  validation_messages = {
    'name': [
      { type: 'required', message: 'User Name is required.' },
    ]
  };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public afAuthService: AuthServiceProvider,
    public app: App,
    public toastCtrl: ToastController) 
    {
      this.profile_form = new FormGroup({
        name: new FormControl('', Validators.required),
      });
    }

    ionViewWillLoad(){
      this.afAuthService.getCurrentUser()
      .then( user => {
        this.user = user;
        this.updateUserProfiles(this.user.userName);
      }, err => console.log(err))
     }
     updateUserProfiles(userName) {
      this.profile_form.patchValue({
        name: userName,
      });
    }
    saveUserProfiles(value){
      this.afAuthService.updateUserProfiles(value)
      .then(res => {
        console.log(res);
        let toast = this.toastCtrl.create({
          message: 'Your name was updated successfully',
          duration: 3000
        });
        toast.present();
      }, (error) =>
      { console.log(error)})
    }
  
     logout(){
      this.afAuthService.logout()
      .then((res) => {
        this.app.getRootNav().pop();//log out to previous navigation
        let toast = this.toastCtrl.create({
          message: 'You have been logged out',
          duration: 2000
        });
        toast.present();
      }, (error) => {
        console.log("Logout error", error);
      });
    }

}
