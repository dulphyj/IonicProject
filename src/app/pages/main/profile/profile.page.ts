import { Component, inject, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  utilsService = inject(UtilsService)
  firebaseService = inject(FirebaseService)


  ngOnInit() {
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

  async takeImage() {
    let user = this.user();
    let path = `user/${user.uid}` 
    const dataUrl = (await this.utilsService.takePicture('image')).dataUrl;
    const loading = await this.utilsService.loading();
    await loading.present();

    let imgPath = `${user.uid}/profile`
    user.img = await this.firebaseService.updateImg(imgPath, dataUrl)

    this.firebaseService.updateDocument(path, {img:user.img })
    .then(async resp =>{
      this.utilsService.saveLocalStorage('user', user)

        this.utilsService.presentToast({
          message: `Image updated successfully.`,
          duration: 2000,
          position: 'top',
          color: 'primary',
          icon: 'checkmark-circle-outline'
        })
        }).catch(
        err => {
          this.utilsService.presentToast({
            message: err.message,
            duration: 2000,
            position: 'top',
            color: 'danger',
            icon: 'alert-circle-outline'
          })
        }
      ).finally(()=> loading.dismiss())
  }

}
