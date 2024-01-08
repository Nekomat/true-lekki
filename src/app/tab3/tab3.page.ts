import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(
    public service: DataService,
    private alertCtrl: AlertController ,
    private router:Router ,
  ) {}
  St = 0;
  ngOnInit(): void {
    this.service.panier.forEach((element) => {
      this.St += element.price * element.qty;
    });
    FirebaseAnalytics.setScreenName({
      screenName: "Panier",
      nameOverride: "Page panier",
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
  // go to checkout 
 async goTocheckout(){ 
    if(this.service.userData){
      this.router.navigateByUrl('/checkout')
    }else{
   const alert  = await this.alertCtrl.create({
    header:'Avertissement',
    message:'Vous devrez avoir un compte avant de commander ',
    buttons:[{
      text:'Ok',
      handler:()=>{
        this.router.navigateByUrl('/welcome1')
      }
    },{
      text:'Non',
    }]
   }) 
   alert.present()
    }
   
  }
}
