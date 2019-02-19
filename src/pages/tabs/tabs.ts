import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import {MemoryMapPage} from '../memory-map/memory-map'
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root:any;
  tab2Root:any;
  tab3Root:any;
//set tabspage for when user login it will show this tabspage with 3 tabs: Home Maps And Profile
  constructor() {
    this.tab1Root = HomePage;//set tab1 is Home Page
    this.tab2Root=MemoryMapPage;//set tab2 is Map page
    this.tab3Root = ProfilePage;//tab3 is Profile Page
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
