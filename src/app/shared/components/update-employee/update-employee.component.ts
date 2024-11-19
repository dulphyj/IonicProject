import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent  implements OnInit {

  firebaseService = inject(FirebaseService)
  utilsService = inject(UtilsService)
  

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    //img: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.min(0)]),
    position: new FormControl('', [Validators.required]),
    squad: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  async submit(){
    console.log(this.form.value)
    /*if (this.form.valid) {
      const loading = await this.utilsService.loading()
      await loading.present()

      this.firebaseService.signIn(this.form.value as User)
      .then(resp => {
        this.getUserInfo(resp.user.uid)
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
    }*/
  }
}
