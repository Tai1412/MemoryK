import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any



/**
 * Generated class for the MemoryMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memory-map',
  templateUrl: 'memory-map.html',
})
export class MemoryMapPage {
  googleMap: any;
  currentPoint:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public geo:Geolocation) {
    this.currentPoint = [];
  }
  
  ionViewDidEnter(){
    //Set latitude and longitude of some place when goole map open
    this.googleMap = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.8858898, lng: 150.9526177 }, //set it at canley vale
      zoom: 15
    });
  }

  currentLocation(){
    this.clearMarkersPoint();//remove previous markers point

    this.geo.getCurrentPosition().then((resp) => {
      let pos = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      let markerPoint = new google.maps.Marker({
        position: pos,
        map: this.googleMap,
        title: 'I am here!'
      });
      this.currentPoint.push(markerPoint);
      this.googleMap.setCenter(pos);


    }).catch((error) => {
      console.log('Error getting location', error);

    });
  }

  clearMarkersPoint(){
    for (let i = 0; i < this.currentPoint.length; i++) {
      console.log(this.currentPoint[i])
      this.currentPoint[i].setMap(null);
    }
    this.currentPoint = [];
  }

}
