import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-succes-order',
  templateUrl: './succes-order.page.html',
  styleUrls: ['./succes-order.page.scss'],
})
export class SuccesOrderPage implements OnInit {
  constructor(public service: DataService) {}

  ngOnInit() {}
}
