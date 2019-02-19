import { Component, } from '@angular/core';
import { ViewController,LoadingController,ToastController  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MemoryServiceProvider } from '../../providers/memory-service/memory-service.service';
import { ImagePicker } from '@ionic-native/image-picker';

/**
 * Generated class for the NewMemoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-memory',
  templateUrl: 'new-memory.html',
})
export class NewMemoryPage {
  loading: any;
  validations_form: FormGroup;
  memoryImage: any;
  validation_messages = {
    'memoryTitle': [
        { type: 'required', message: 'Title is required' },
      ],
    'memoryDescription': [
        { type: 'required', message: 'Description is required' },
      ]
    
  };
  constructor(
    private viewCtrl: ViewController,
    // private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private afService: MemoryServiceProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private imagePicker: ImagePicker
  ) 
  {
    this.memoryImage = "./assets/imgs/default.png";
    this.validations_form = this.formBuilder.group({
      memoryTitle: new FormControl('', Validators.required),
      memoryDescription: new FormControl('', Validators.required),
      memoryDate: new FormControl('Undate'),
      importantRate: new FormControl('Important rate not choose'),
      memoryLocation: new FormControl('Location not set yet')
    });
    this.loading = this.loadingCtrl.create();
  }

  // ionViewDidLoad() {
  //   this.resetFields();
  // }
  // resetFields(){
    
  // }
  dismiss() {
    this.viewCtrl.dismiss();
   }
   onSubmit(memoryValue){
    let data = {
      memoryTitle: memoryValue.memoryTitle,
      memoryDescription: memoryValue.memoryDescription,
      memoryImage: this.memoryImage,
      memoryDate:memoryValue.memoryDate,
      importantRate:memoryValue.importantRate,
      memoryLocation:memoryValue.memoryLocation
    }
    this.afService.createMemory(data)
    .then(
      res => {
        let toast = this.toastCtrl.create({
          message: 'Your new memory has been created',
          duration: 2000
        });
        toast.present();
        this.viewCtrl.dismiss(); // dismiss memoryTask when save
      }
    )
  }
  openImage(){
    this.imagePicker.hasReadPermission()
    .then((result) => {
      if(result == false){
        this.imagePicker.requestReadPermission();
      }
      else if(result == true){
        this.imagePicker.getPictures({
          maximumImagesCount: 1,
          outputType:1
        }).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.memoryImage=results[i];
            }
          }, 
          (error) => console.log(error)
        );
      }
    }, 
    (error) => {
      console.log(error);
    });
  }

}
