import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"novel-library-8ec1c","appId":"1:280886265261:web:49063bbe0ff64330aa8d24","storageBucket":"novel-library-8ec1c.appspot.com","apiKey":"AIzaSyDv2cQUMZ4VbKD5rFxTHPonzNciPtatcno","authDomain":"novel-library-8ec1c.firebaseapp.com","messagingSenderId":"280886265261","measurementId":"G-X6SVMPF528"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())]
};
