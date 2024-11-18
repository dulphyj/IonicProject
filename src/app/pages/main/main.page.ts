import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router = inject(Router);
  fireService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  currentPath = '';

  pages = [
   { title: 'Home', url: '/main/home', icon:  'home-outline'},
   { title: 'Profile', url: '/main/profile', icon: 'person-outline' }
  ];

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) {
        this.currentPath = event.url;
      }
    });
    console.log(this.pages);
  }
  signOut(){
    this.fireService.signOut()
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }
}
