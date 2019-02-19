import { Component } from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { MemoryServiceProvider } from '../../providers/memory-service/memory-service.service';
import { NewMemoryPage } from '../new-memory/new-memory';
import { MemoryDetailPage } from '../memory-detail/memory-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  memoryItems: Array<any>= [];
  
  
  constructor(
    private modalCtrl: ModalController,
    private afService: MemoryServiceProvider,
    private navCtrl:NavController
    ) { 
    }

    ionViewWillEnter(){
      this.getMemoryData();
    }
    getMemoryData(){
      this.afService.getMemory()
      .then(tasks => {
        this.memoryItems = tasks;
      })
    }
    viewDetails(id, memoryItem){
      let data = {
        memoryTitle: memoryItem.memoryTitle,
        memoryDescription: memoryItem.memoryDescription,
        memoryImage: memoryItem.memoryImage,
        memoryDate:memoryItem.memoryDate,
        importantRate:memoryItem.importantRate,
        memoryLocation:memoryItem.memoryLocation,
        id: id
      }
      this.navCtrl.push(MemoryDetailPage, {
        data: data
      })
    }
  
    openNewMemoryPage(){
       let modal=this.modalCtrl.create(NewMemoryPage);//pop newMemoryPage
      modal.onDidDismiss(data => {
        this.getMemoryData();
      });
      modal.present();
    }

}
