import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const config = {
  apiKey: 'AIzaSyABTDZ8v44sxQjgAXI2hCGDp0sC9aMfoRs',
  authDomain: 'sample-app-74e4b.firebaseapp.com',
  databaseURL: 'https://sample-app-74e4b.firebaseio.com',
  projectId: 'sample-app-74e4b',
  storageBucket: '',
  messagingSenderId: '149891636123',
  appId: '1:149891636123:web:7ebe48f5b519ccb1049f3e',
  measurementId: 'G-PBEXD3KKQN'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
