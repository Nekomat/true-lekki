import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(
    public service: DataService,
    private alertCtrl: AlertController
  ) {}
  St = 0;
  ngOnInit(): void {
    this.service.panier.forEach((element) => {
      this.St += element.price * element.qty;
    });
  }
  async DeleteInCart(data) {
    const alert = await this.alertCtrl.create({
      header: 'Avertissement',
      message: 'Voulez-vous supprimé ce produit dans votre panier ? ',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            this.service.DeleteInPanier(data);
          },
        },
        {
          text: 'Non',
        },
      ],
    });
    alert.present();
  }
}
