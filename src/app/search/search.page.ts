import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(public service: DataService, private router:Router) {}
  allProduct: any;
  product: any;
  ngOnInit() {
    this.allProduct = this.service.AllProduct;
    this.allProduct.forEach((element) => {
      this.service.panier.forEach((elementP) => {
        if (element.id == elementP.id) {
          element = elementP;
        }
      });
    });
  }
  word = '';
  Serch(event) {
    if (this.word) {
      this.product = this.allProduct.filter((e) =>
        e.name.toLowerCase().includes(this.word.toLowerCase())
      );
    } else {
      this.product = undefined;
    }
  }
  GoBack() {
   this.router.navigateByUrl('/')
  }
}
