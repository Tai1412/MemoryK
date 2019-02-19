import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMemoryPage } from './new-memory';
import {HomePage} from '../home/home'

@NgModule({
  declarations: [
    NewMemoryPage,
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(NewMemoryPage),
  ],
  entryComponents:[
    HomePage
  ]
})
export class NewMemoryPageModule {}
