import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  firebaseService = inject(FirebaseService)
  utilsService = inject(UtilsService)
  
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor() { }

  ngOnInit() {
  }

  async submit(){
    if (this.form.valid) {
      const loading = await this.utilsService.loading()
      await loading.present()

      this.firebaseService.sendRecoveryEmail(this.form.value.email as string)
      .then(resp => {
        this.utilsService.presentToast({
          message: 'Check your email',
          duration: 2000,
          position: 'top',
          color: 'primary',
          icon: 'mail-outline'
        })
        this.utilsService.routerlink('/auth')
        this.form.reset()
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
