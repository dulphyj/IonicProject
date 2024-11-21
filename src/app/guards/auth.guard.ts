import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';


export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService)
  let user = localStorage.getItem('user')
  return new Observable<boolean>((observer) => {
    firebaseService.getAuth().onAuthStateChanged((auth)=>{
      if (auth && user) {
        observer.next(true);
      } else {
        firebaseService.signOut();
        observer.next(false);
      }
      observer.complete();
    })
  })
};
