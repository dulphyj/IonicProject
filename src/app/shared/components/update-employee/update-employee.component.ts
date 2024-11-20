import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employees } from 'src/app/models/employees.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent  implements OnInit {

  @Input() employee: Employees | undefined

  firebaseService = inject(FirebaseService)
  utilsService = inject(UtilsService)
  
  user = {} as User

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required]),
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    position: new FormControl('', [Validators.required]),
    staff: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user')
    if(this.employee) this.form.setValue(this.employee)
  }

  setNumberInput() {
    let { salary } = this.form.controls;
    if (salary.value !== null && salary.value !== undefined) {
      const parsedValue = parseFloat(salary.value.toString());
      if (!isNaN(parsedValue)) {
        salary.setValue(parsedValue);
      } else {
        console.error('The entered value is not valid: ', salary.value);
      }
    }
  }

  async submit(){
    if(this.form.valid){
      if(this.employee) this.updateEmployee();
      else this.createEmployee();
    }
  }

  async createEmployee(){
    let path = `user/${this.user.uid}/employee`
    const loading = await this.utilsService.loading()
    await loading.present()
    
    let dataUrl = this.form.value.img;
    let imgPath = `${this.user.uid}/${Date.now()}`;
    let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl)
    
    this.form.controls.img.setValue(imgUrl);

    const employeeData = { ...this.form.value };
    delete employeeData.id;

    this.firebaseService.addDocument(path, employeeData)
    .then(async =>{
      this.utilsService.dismissModal({success: true})
      this.utilsService.presentToast({
        message: `Employee created successfully.`,
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

  async updateEmployee(){
    let path = `user/${this.user.uid}/employee/${this.employee?.id}`
    const loading = await this.utilsService.loading()
    await loading.present()

    if(this.employee?.img && this.form.value.img !== this.employee?.img){
      let dataUrl = this.form.value.img;
      let imgPath = await this.firebaseService.getFilePath(this.employee.img);
      let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl)
      this.form.controls.img.setValue(imgUrl);
    }

    const formData = {...this.form.value}
    delete formData.id

    this.firebaseService.updateDocument(path, formData)
    .then(async =>{
      this.utilsService.dismissModal({success: true})
      this.utilsService.presentToast({
        message: `Employee updated successfully.`,
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

  async takeImage() {
    const photo = await this.utilsService.takePicture('image');
    if (photo.dataUrl) {
      this.form.controls.img.setValue(photo.dataUrl);
    } else {
      this.utilsService.presentToast({
        message: 'Could not get image.',
        duration: 2000,
        position: 'top',
        color: 'danger',
        icon: 'alert-circle-outline'
      });
    }
  }
}
