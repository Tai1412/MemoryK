import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemoryDetailPage } from './memory-detail';

@NgModule({
  declarations: [
    MemoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MemoryDetailPage),
  ],
})
export class MemoryDetailPageModule {}
