import { Component } from '@angular/core';
import { AllService } from '../all.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private services: AllService){}
}
