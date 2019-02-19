import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service.service';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Validators, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading:any;
  errorMessage: string = '';
  login: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public fAuthService: AuthServiceProvider,
    public toastCtrl:ToastController
    ) {
      this.login = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  emailLogin(userValue){
    this.fAuthService.emailLogin(userValue)
    .then(res =>{
      this.navCtrl.push(TabsPage);
      let toast = this.toastCtrl.create({
        message: 'Welcome Back',
        duration: 2000
      });
      toast.present();
      this.login.reset();
    }, err => this.errorMessage = err.message)
  }

  facebookLogin() {
    this.loading = this.loadingCtrl.create();
    this.fAuthService.facebookLogin()
    .then((res) => {
      this.navCtrl.push(TabsPage);
      let toast = this.toastCtrl.create({
        message: 'Welcome Back',
        duration: 2000
      });
      toast.present();
      this.loading.dismiss();
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  openSignup() {
    this.navCtrl.push(RegisterPage);
  }

}
