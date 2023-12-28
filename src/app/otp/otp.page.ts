import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
  Timestamp,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
 
  constructor(
    public service: DataService,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private fire: Firestore,
    private auth: Auth,
    private router: Router ,
    private http:HttpClient
  ) {}

  ngOnInit() {
    console.log(this.service.otp);
    console.log(this.service.userInit);
  }
  async otpValue(value: string) {
    if (this.service.otpType == 'otp') { 
      if (value.length == 4) { 
        if (value == this.service.otp) { 
          const code =
            this.service.userInit.section1.value.prenom[0] +
            this.service.userInit.section1.value.prenom[1] +
            `${Math.floor(Math.random() * 10)}` +
            `${Math.floor(Math.random() * 10)}` +
            `${Math.floor(Math.random() * 10)}`;
          const load = await this.loadCtrl.create({
            message: 'veuillez patieter',
          });
          load.present();
          createUserWithEmailAndPassword(
            this.auth,
            `${code}@lekki.com`,
            this.service.userInit.section2.value.password
          )
            .then((user) => {
              const refUser = doc(this.fire, 'USERS', user.user.uid);
              setDoc(refUser, {
                id: user.user.uid,
                name: this.service.userInit.section1.value.prenom,
                numero: this.service.userInit.section1.value.numero,
                email: `${code}@lekki.com`,
                password: this.service.userInit.section2.value.password,
                time: Timestamp.now(),
                code: code,
              }).then(() => {
                this.service.GetUserData();
                load.dismiss();
                this.router.navigateByUrl('/', {
                  replaceUrl: true,
                });
              });
            })
            .catch(async (e) => {
              load.dismiss();
              const alert = await this.alertCtrl.create({
                header: 'Info',
                message: 'Erreur veuillez reessayer' + e.message,
                buttons: [
                  {
                    text: 'OK',
                  },
                ],
              });
              alert.present();
            });
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Info',
            message: 'Code incorrecte',
            buttons: [
              {
                text: 'OK',
              },
            ],
          });
          alert.present();
        }
      } 
    }else{
     //  si le otp vient de reset
     if (value.length == 4) {
      if (value == this.service.otp) {
        const load = await this.loadCtrl.create({
          message: 'Veuillez patienter',
        });
        load.present();
        signInWithEmailAndPassword(
          this.auth,
          this.service.userData.email,
          this.service.userData.password
        ).then(async() => {
          load.dismiss();
          this.router.navigateByUrl('/', {
            replaceUrl: true,
          });
          // on envoi son mot de passe 
          const refToken = await getDoc(
            doc(this.fire, 'APPINFO', 'WO3qaXwpoanK4N84qPF7')
          ); 
          if(refToken.exists()){
            const token:any = refToken.data() 
            //request header
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.tokenSms}`,
          }),
        };
          //les data pour la requete
        let data = {
          outboundSMSMessageRequest: {
            address: `tel:+224${this.service.userData.numero}`,
            senderAddress: 'tel:+2240000',
            senderName: 'Lekki appli',
            outboundSMSTextMessage: {
              message: `Bonjour votre mot de passe est : ${this.service.userData.password}`,
            },
          },
        };
        this.http
        .post(
          'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
          data,
          httpOptions
        ).subscribe(()=>{
          console.log('oui');
          
        })
          }
        });
      }
    }
    }
  }
}
