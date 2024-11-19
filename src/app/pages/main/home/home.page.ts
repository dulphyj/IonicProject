import { Component, inject, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { Employees } from 'src/app/models/employees.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  utilsService = inject(UtilsService)
  firebaseService = inject(FirebaseService)
  loading: boolean = false
  employees: Employees[] = []
  private subscription: Subscription | null = null


  ngOnInit() {
    this.getEmployee();
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe();
  }

  async addUpdateEmployee(employee?: Employees){
    let modal = await this.utilsService.getModal({
      component: UpdateEmployeeComponent,
      cssClass: 'add-update-modal',
      componentProps: {employee}
    })
  }

  user(): User{
    return this.utilsService.getLocalStorage('user');
  }

  getEmployee(){
    let path = `user/${this.user().uid}/employee`
    this.loading = true

    this.subscription = this.firebaseService.getCollectionData(path)
    .snapshotChanges().pipe(
      map(change => change.map(c => ({
        id: c.payload.doc.id,
        ...c.payload.doc.data()
      })))
    ).subscribe({
      next: (resp: any) => {
        this.employees = resp
        this.loading = false
      }
    })
  }

  doRefresh(event: any){
    setTimeout(() => {
      event.target.complete();
    }, 1000)
  }
}
