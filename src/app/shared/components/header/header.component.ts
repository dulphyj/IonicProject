import { Component, inject, Input, input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() showMenu!: boolean;
  @Input() backButton!: string;
  @Input() isModal!: boolean;

  utilsService = inject(UtilsService)
  ngOnInit() {}

  dismissModal() {
    this.utilsService.dismissModal();
  }

}
