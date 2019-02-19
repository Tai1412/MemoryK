import { Component } from '@angular/core';
import { NavController, LoadingController,ToastController } from 'ionic-angular';
import { Validators, FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service.service';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm: FormGroup;
  loading: any;
  errorMessage: string = '';
  validation_messages = {
    'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'email', message: 'Please enter the valid email' },
        { type: 'maxlength', message: 'The email only accept 20 characters before @gmail.com' },
        { type: 'pattern', message: 'The email only accept gmail.com and more than 5 characters long' }
      ],
    'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'minLength', message: 'Only accept password equal or more than 6 characters'},
      ]
    
  };
  constructor(
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public fAuthService: AuthServiceProvider,
    public formBuilder:FormBuilder,
    public toastCtrl:ToastController
    ) 
    {
      this.signupForm = new FormGroup({
        email: new FormControl('',[ Validators.required,Validators.email,Validators.pattern('^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$'),Validators.maxLength(30)]),
        password: new FormControl('', [Validators.required,Validators.minLength(6)])
      });
    }

    emailSignup(userValue){
      this.loading = this.loadingCtrl.create();
      this.fAuthService.emailRegister(userValue)
      .then(res => {
        this.fAuthService.emailLogin(userValue)
        .then(res => {
          let toast = this.toastCtrl.create({
          message: 'Gratz,Register Completed!',
          duration: 2000})
          toast.present();
          this.navCtrl.push(TabsPage);
          this.signupForm.reset();
          this.loading.dismiss();
        }, error => this.errorMessage = error.message)
      }, error => this.errorMessage = error.message)
    }

}
