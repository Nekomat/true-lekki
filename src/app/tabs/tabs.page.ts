import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public service : DataService) {}

}
