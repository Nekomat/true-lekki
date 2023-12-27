import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {
  constructor(
    private fire: Firestore,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formCtrl: FormBuilder,
    private service: DataService,
    private router: Router,
    private http: HttpClient
  ) {}
  // form Control
  section: FormGroup = this.formCtrl.group({
    numero: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(\+\d{3}\s?)?\(?6\d{2}\)?[\s-]*\d{2}[\s-]*\d{2}[\s-]*\d{2}$/
        ),
      ],
    ],
  });
  ngOnInit() {}
  async SendOtp() {
    try {
      const load = await this.loadCtrl.create({
        message: 'Veuillez patienter',
      });
      load.present();
      const refUserData = await getDocs(
        query(
          collection(this.fire, 'USERS'),
          where('numero', '==', this.section.value.numero)
        )
      );
      let isData = [];
      refUserData.forEach((element) => {
        isData.push(element.data());
      });

      if (isData[0]) {
        load.dismiss();
        // envoi de code de verification
        let code =
          `${Math.floor(Math.random() * 10)}` +
          `${Math.floor(Math.random() * 10)}` +
          `${Math.floor(Math.random() * 10)}` +
          `${Math.floor(Math.random() * 10)}` 
          
        //  prendre le token
        const refToken = await getDoc(
          doc(this.fire, 'APPINFO', 'DjhFwmiL3MK9p8jghUEd')
        );
        if (refToken.exists()) {
          const hisData: any = refToken.data();
          //request header
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${hisData.tokenSms}`,
            }),
          };
          //les data pour la requete
          let data = {
            outboundSMSMessageRequest: {
              address: `tel:+224${this.section.value.numero}`,
              senderAddress: 'tel:+2240000',
              senderName: 'Lekki appli',
              outboundSMSTextMessage: {
                message: `Votre code de validation : ${code}`,
              },
            },
          };
          // envoi de la requete
          this.http
            .post(
              'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
              data,
              httpOptions
            )
            .subscribe(
              () => {
                this.service.userData = isData[0];
                this.service.otpType = 'reset';
                this.service.otp = code;
                load.dismiss();
                this.router.navigateByUrl('/otp', { replaceUrl: true });
              },
              async () => {
                load.dismiss();
                const alert = await this.alertCtrl.create({
                  header: 'Avertissement',
                  message: 'Erreur veuillez reessayer',
                  buttons: [{ text: 'OK' }],
                });
                alert.present();
              }
            );
        }
      } else {
        load.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Info',
          message: 'Votre numéro de télephone ne correspond pas à un compte',
          buttons: [{ text: 'Ok' }],
        });
        alert.present();
      }
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Info',
        message: 'Erreur veuillez reessayer',
        buttons: [{ text: 'Ok' }],
      });
      alert.present();
    }
  }
}
