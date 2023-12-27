import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-wait-validation',
  templateUrl: './wait-validation.page.html',
  styleUrls: ['./wait-validation.page.scss'],
})
export class WaitValidationPage implements OnInit {

  constructor(
    public service : DataService
  ) { }

  ngOnInit() {
  }

}
