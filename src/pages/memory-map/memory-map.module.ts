import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoryMapPage } from './memory-map';

@NgModule({
  declarations: [
    MemoryMapPage,
  ],
  imports: [
    IonicPageModule.forChild(MemoryMapPage),
  ],
})
export class MemoryMapPageModule {}
