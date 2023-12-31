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
          let password = this.generatePassword()
          createUserWithEmailAndPassword(
            this.auth,
            `${code}@lekki.com`,
             password
          )
            .then((user) => {
              const refUser = doc(this.fire, 'USERS', user.user.uid);
              setDoc(refUser, {
                id: user.user.uid,
                name: this.service.userInit.section1.value.prenom,
                numero: this.service.userInit.section1.value.numero,
                email: `${code}@lekki.com`,
                password: password,
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
          
        });
      }
    }
    }
  }
  generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
}
