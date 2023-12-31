import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { CapacitorHttp } from '@capacitor/core';
import { Position } from '@capacitor/geolocation';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment.prod';
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private auth: Auth,
    private fire: Firestore,
    private location: Location,
    private toastCtrl: ToastController
  ) {
    this.GetUserData();
    // initialisation de l'analytique 
    FirebaseAnalytics.initializeFirebase(environment.firebase); 
    FirebaseAnalytics.setCollectionEnabled({enabled:true})
    FirebaseAnalytics.setSessionTimeoutDuration({
      duration: 10000,
    });
  }
  userLocation: any;
  userData: any;
  userInit: any;
  userNaissance: Date;
  otp = '';
  otpType = 'otp';
  panier = [];
  GetPharMessage: any;
  SoutTotal = 0;
  AllProduct:Array<any>=[];
  pharmacie: any;
  commandeCode: any;
 traiteCommande:any
 typeTraiteCommande='commande'
  GetUserData() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) { 
      FirebaseAnalytics.setUserId({
        userId:user.uid
      })
        const refUser = await getDoc(doc(this.fire, 'USERS', user.uid));
        if (refUser.exists()) {
          this.userData = refUser.data(); 
        } 
      } 
    });
  }
  BackBnt() { 
    this.location.back();
  } 
  //  start gestion de panier
  async AddTocart(data) { 
    if(data.isPanier){
      this.ShowMessage('Le produit a déjà été ajouté à votre panier.')
      return
    }
    data.qty=1
    data.isPanier=true
    data.btn='Ajouté'
     this.panier.push(data)
     this.ShowMessage('Produit ajouté dans votre panier.')
     FirebaseAnalytics.logEvent({
      name: `les produits ajoute au panier par ${this.userData.name}`,
      params: {
        content_type: "produit",
        content_id: data.name,
      },
    });
    
  }
  //  augmenter la quantité
  AddQty(data) {
    data.qty++;
    if (data.qty >= 2) {
      data.canLess = true;
    }
    let i = this.panier.findIndex((e) => e.id == data.id);
    this.panier[i] = data;

  }
  //  diminuer la quantité
  LessQty(data) {
    if (data.qty > 1) {
      data.qty--;
      let i = this.panier.findIndex((e) => e.id == data.id);
      this.panier[i] = data;
      if (data.qty == 1) {
        data.canLess = false;
      }
    }
  }
  // supprimer du panier
  DeleteInPanier(data) {
    data.isPanier = false;
    data.btn='Ajouter'
    this.panier = this.panier.filter((e) => e.id != data.id);
    this.ShowMessage('produit supprimé de votre panier');
  }
  // message pour panier
  async ShowMessage(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000,
      color:'dark',
      cssClass:'toastCtrl'
    });
    toast.present();
  }
  Getdistance(lat1, long1, lat2, long2): Promise<any> {
    return new Promise((resolve, reject) => {
      CapacitorHttp.get({
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${lat1}%2C${long1}&origins=${lat2}%2C${long2}&key=${environment.mapsKey}`,
        responseType: 'json',
      })
        .then((res) => {
          let Res = res.data;
          if (Res.rows[0].elements[0]) {
            let distance = Res.rows[0].elements[0].distance.value / 1000;
            let data = {
              distance: distance,
              hour: Res.rows[0].elements[0].duration.text,
            };
            resolve(data);
          } else {
            reject('erreur');
          }
        })
        .catch(() => {
          reject('erreur');
        });
    });
  }
}
