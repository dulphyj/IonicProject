import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.scss'],
})
export class LoginInputComponent  implements OnInit {
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type!: string;
  @Input() autocomplete!: string;
  @Input() icon!: string;

  isPassword!: boolean;
  hide: boolean = true;


  constructor() { }

  ngOnInit() {
    if(this.type === 'password') this.isPassword = true;
  }
  showPassword() {
    this.hide =!this.hide;
    if(this.hide) this.type = 'password';
    else this.type = 'text';
  }

}
