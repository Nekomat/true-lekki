import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  constructor(
    public service: DataService,
    private formCtrl: FormBuilder,
    private fire: Firestore,
    private loadCtrl: LoadingController,
    private http: HttpClient,
    private router: Router,
    private alertCtrl: AlertController
  ) {}
  // controle formulaire
  section: FormGroup = this.formCtrl.group({
    adresse: ['', [Validators.required]],
  });
  fraisService = 0;
  SousTotal = 0;
  Total = 0;
  fraisTranport = 0;
  async ngOnInit() {
    // const refFrais = await getDoc(
    //   doc(this.fire, 'APPINFO', 'DjhFwmiL3MK9p8jghUEd')
    // );
    // if (refFrais.exists()) {
    //   let hisData: any = refFrais.data();
    //   this.fraisService = hisData.fraisService;
    //   this.fraisTranport = hisData.fraisTransport;
    //   this.service.panier.forEach((element) => {
    //     this.SousTotal += element.price * element.qty;
    //   });
    //   this.Total = hisData.fraisService + this.SousTotal + this.fraisTranport;
    // }
  }
  // lance la commande
  async PlaceOrders() {
    const load = await this.loadCtrl.create({ message: 'Veuillez patienter' });
    load.present();
      // prendre le token du message
      const refToken = await getDoc(
        doc(this.fire, 'APPINFO', 'WO3qaXwpoanK4N84qPF7')
      );
      if (refToken.exists()) {
        const tokenHisData: any = refToken.data();
        let code =
          `${Math.floor(Math.random() * 10)}` +
          `${Math.floor(Math.random() * 10)}` +
          `${Math.floor(Math.random() * 10)}` +
          `${Math.floor(Math.random() * 10)}`;
        //request header
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokenHisData.tokenSms}`,
          }),
        };
        //les data pour la requete
        let data = {
          outboundSMSMessageRequest: {
            address: `tel:+224${this.service.userData.numero}`,
            senderAddress: 'tel:+2240000',
            senderName: 'Lekki',
            outboundSMSTextMessage: {
              message: `Bonjour votre commande N${code} est en cour de traitement par les pharmacies`,
            },
          },
        };
        this.http
          .post(
            'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
            data,
            httpOptions
          )
          .subscribe(
            () => {
              const refdoc = doc(collection(this.fire,'COMMANDES'))
              setDoc(refdoc,{
                id:refdoc.id,
                code:code,
                product:this.service.panier,
                lieux:this.section.value.adresse,
                numero:this.service.userData.numero,
                statut:'En cour de traitement',
                userCode:this.service.userData.code,
                time:Timestamp.now(),
                userId:this.service.userData.id,
                name:this.service.userData.name
              })
              this.service.panier=[]
              this.service.commandeCode=code
              load.dismiss()
              this.router.navigateByUrl('/wait-validation')
            },
            async () => {
              load.dismiss();
              const alert = await this.alertCtrl.create({
                header: 'Avertissement',
                message: 'Erreur veuillez reessayer',
                buttons: [{ text: 'Ok' }],
              });
              alert.present();
            }
          );
      }
    
  }
}
