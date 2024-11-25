import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { initializeApp } from 'firebase/app';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();
}

initializeApp(environment.firebase);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

  defineCustomElements(window);