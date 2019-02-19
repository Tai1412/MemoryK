import { Component } from '@angular/core';
import { ViewController, ToastController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MemoryServiceProvider } from '../../providers/memory-service/memory-service.service';
import { ImagePicker } from '@ionic-native/image-picker';


/**
 * Generated class for the MemoryDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-memory-detail',
  templateUrl: 'memory-detail.html',
})
export class MemoryDetailPage {
  validations_form: FormGroup;
  memoryImage: any;
  memoryItem: any;
  loading: any; 
  validation_messages = {
    'memoryTitle': [
        { type: 'required', message: 'Title is required' },
      ],
    'memoryDescription': [
        { type: 'required', message: 'Description is required' },
      ]
    
  };

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
    private afService: MemoryServiceProvider,
    private loadingCtrl: LoadingController
  ) {
    this.memoryItem = this.navParams.get('data');
    this.memoryImage = this.memoryItem.memoryImage;
    this.validations_form = this.formBuilder.group({
      memoryTitle: new FormControl(this.memoryItem.memoryTitle, Validators.required),
      memoryDescription: new FormControl(this.memoryItem.memoryDescription, Validators.required),
      memoryDate: new FormControl(this.memoryItem.memoryDate),
      importantRate: new FormControl(this.memoryItem.importantRate),
      memoryLocation:new FormControl(this.memoryItem.memoryLocation)
    });
    this.loading = this.loadingCtrl.create();
  }
    dismiss() {
      this.viewCtrl.dismiss();
     }
   
     onSubmit(memoryValue){
       let data = {
         memoryTitle: memoryValue.memoryTitle,
         memoryDescription: memoryValue.memoryDescription,
         memoryDate:memoryValue.memoryDate,
         importantRate:memoryValue.importantRate,
         memoryLocation:memoryValue.memoryLocation,
         memoryImage: this.memoryImage
       }
       this.afService.updateMemory(this.memoryItem.id,data)
       .then(
         res => {
          let toast = this.toastCtrl.create({
            message: 'Your memory has been updated',
            duration: 2000
          });
          toast.present();
           this.viewCtrl.dismiss();
         }
       )
     }
   
     delete() {
       let confirm = this.alertCtrl.create({
         title: 'Confirm',
         message: 'Do you want to delete ' + this.memoryItem.memoryTitle + '?',
         buttons: [
           {
             text: 'No',
             handler: () => {}
           },
           {
             text: 'Yes',//if yes run delete memory
             handler: () => {
               this.afService.deleteMemory(this.memoryItem.id)
               .then((res) =>{
                   this.viewCtrl.dismiss()
                   let toast = this.toastCtrl.create({
                    message: 'Your memory has been deleted',
                    duration: 2000
                  });
                  toast.present();
                  })
                .catch((err) =>{
                   console.log(err)
                });
             }
           }
         ]
       });
       confirm.present();
     }
   
     openImagePicker(){
       this.imagePicker.hasReadPermission()
       .then((result) => {
         if(result == false){
           // no callbacks required as this opens a popup which returns async
           this.imagePicker.requestReadPermission();
         }
         else if(result == true){
           this.imagePicker.getPictures({
             maximumImagesCount: 1,
             outputType: 1
           }).then(
             (results) => {
               for (var i = 0; i < results.length; i++) {
                 this.memoryImage=results[i];
               }
             }, (err) => console.log(err)
           );
         }
       }, (err) => {
         console.log(err);
       });
     }
  }

