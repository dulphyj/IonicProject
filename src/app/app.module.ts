import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {initializeApp} from 'firebase/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCWGdDdk1McQxa0mvQwg_W8qNhcV_Y58Eg",
  authDomain: "employes-3cd8e.firebaseapp.com",
  projectId: "employes-3cd8e",
  storageBucket: "employes-3cd8e.firebasestorage.app",
  messagingSenderId: "684967950343",
  appId: "1:684967950343:web:6932a5c5596abe9ac792a2",
  measurementId: "G-EE6XMK15J3"
};

initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
