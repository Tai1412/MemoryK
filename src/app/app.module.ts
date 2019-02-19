import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { environment } from '../environments/environment';
import { AuthServiceProvider } from '../providers/auth-service/auth-service.service';
import { MemoryServiceProvider } from '../providers/memory-service/memory-service.service';


//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { NewMemoryPage } from '../pages/new-memory/new-memory';
import { MemoryDetailPage } from '../pages/memory-detail/memory-detail';
import {MemoryMapPage} from '../pages/memory-map/memory-map';

//components
import { LoadImageComponent } from '../components/load-image/load-image';

//Angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

//Ion native plugin
import { Facebook } from '@ionic-native/facebook';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Geolocation } from '@ionic-native/geolocation';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    RegisterPage,
    NewMemoryPage,
    MemoryDetailPage,
    MemoryMapPage,
    LoadImageComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    ProfilePage,
    RegisterPage,
    NewMemoryPage,
    MemoryDetailPage,
    MemoryMapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Facebook,
    ImagePicker,
    Crop,
    MemoryServiceProvider,
    Geolocation
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
