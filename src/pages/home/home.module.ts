import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import {NewMemoryPage} from '../new-memory/new-memory'

@NgModule({
  declarations: [
    HomePage,
    NewMemoryPage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents:[
      NewMemoryPage
  ],
})
export class HomePageModule {}
