import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/storage';
/*
  Generated class for the MemoryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemoryServiceProvider {
  private getSnapshot: any;
  constructor(public afs: AngularFirestore,public afAuth:AngularFireAuth) {}

  async getMemory(){
    return new Promise<any>((resolve,reject) => {
      let user = this.afAuth.auth.currentUser;
      //read data from firebase on user and sort the memory by date
      this.getSnapshot = this.afs.collection('User').doc(user.uid).collection('Memory',ref=>ref.orderBy("memoryDate")).snapshotChanges()
      .subscribe(snapshots => {resolve(snapshots);},reject);
    });
  }
  async unsubscribeLogOut(){
    this.getSnapshot.unsubscribe();
  }
  async updateMemory(memoryKey,memoryValue){
    return new Promise<any>((resolve, reject) => {
      let user = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(user.uid).collection('Memory').doc(memoryKey).set(memoryValue)
      .then((res) => {resolve(res)})
      .catch((error)=>{reject(error)});
    })
  }

  async deleteMemory(memoryKey){
    return new Promise<any>((resolve, reject) => {
      let user = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(user.uid).collection('Memory').doc(memoryKey).delete()
      .then((res) => {resolve(res)})
      .catch((error)=>{reject(error)});
    })
  }
  async createMemory(memoryValue){
    return new Promise<any>((resolve, reject) => {
      let user = this.afAuth.auth.currentUser;
      this.afs.collection('User').doc(user.uid).collection('Memory')
      .add({
        memoryTitle: memoryValue.memoryTitle,
        memoryDescription: memoryValue.memoryDescription,
        memoryImage: memoryValue.memoryImage,
        memoryDate:memoryValue.memoryDate,
        importantRate:memoryValue.importantRate,
        memoryLocation:memoryValue.memoryLocation
      })
      .then((res) => {resolve(res)})
      .catch((error)=>{reject(error)});
    })
  }
}
