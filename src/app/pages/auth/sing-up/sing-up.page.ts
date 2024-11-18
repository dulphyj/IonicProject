import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.page.html',
  styleUrls: ['./sing-up.page.scss'],
})
export class SingUpPage implements OnInit {

  firebaseService = inject(FirebaseService)
  utilsService = inject(UtilsService)

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor() { }

  ngOnInit() {
  }

  async submit(){
    if (this.form.valid) {
      const loading = await this.utilsService.loading()
      await loading.present()

      this.firebaseService.singUp(this.form.value as User)
      .then(resp => {
        this.firebaseService.updateUser(this.form.value.name)
        let uid = resp.user.uid
        this.form.controls.uid.setValue(uid)
        this.setUserInfo(uid)
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
  async setUserInfo(uid: string){
    if (this.form.valid) {
      const loading = await this.utilsService.loading()
      await loading.present()

      let path = `user/${uid}`
      delete this.form.value.password

      this.firebaseService.setDocument(path, this.form.value)
      .then(resp => {
        this.utilsService.saveLocalStorage('user', this.form.value)
        this.utilsService.routerlink('main/home')
        this.form.reset();
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
  
}
