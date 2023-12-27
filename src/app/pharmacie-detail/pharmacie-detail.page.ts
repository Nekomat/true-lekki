import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-pharmacie-detail',
  templateUrl: './pharmacie-detail.page.html',
  styleUrls: ['./pharmacie-detail.page.scss'],
})
export class PharmacieDetailPage implements OnInit {
  constructor(public service: DataService) {}
  today = new Date().getDay();
  ngOnInit() {}
}
