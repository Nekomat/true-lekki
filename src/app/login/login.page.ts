import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private fire: Firestore,
    private auth: Auth,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
    private formCtrl: FormBuilder,
    public Toback: Location
  ) {}
  //section control number phone
  section1: FormGroup = this.formCtrl.group({
    numero: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(\+\d{3}\s?)?\(?6\d{2}\)?[\s-]*\d{2}[\s-]*\d{2}[\s-]*\d{2}$/
        ),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  // section control email
  section2: FormGroup = this.formCtrl.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  ngOnInit() {}
  public typeOfLogin = 'numero';
  async Login() {
    const load = await this.loadCtrl.create({ message: 'Veuillez patienter' });
    load.present();
    try {
      if (this.typeOfLogin == 'email') {
        signInWithEmailAndPassword(
          this.auth,
          this.section2.value.email,
          this.section2.value.password
        )
          .then(() => {
            load.dismiss();
            this.router.navigateByUrl('/', { replaceUrl: true });
          })
          .catch(async () => {
            load.dismiss();
            const alert = await this.alertCtrl.create({
              header: 'Info',
              message: 'Vos informations de connexion sont incorrectes',
            });
            alert.present();
          });
      } else if (this.typeOfLogin == 'numero') {
        const refUserData = await getDocs(
          query(
            collection(this.fire, 'USERS'),
            where('numero', '==', this.section1.value.numero),
            where('password', '==', this.section1.value.password)
          )
        );
        let takeUserData = [];
        refUserData.forEach((element) => {
          takeUserData.push(element.data());
        });
        // si le numero et le password correspnd
        if (takeUserData[0]) {
          signInWithEmailAndPassword(
            this.auth,
            takeUserData[0].email,
            takeUserData[0].password
          ).then(() => {
            load.dismiss();
            this.router.navigateByUrl('/', { replaceUrl: true });
          });
        } else {
          // si le numero et le password ne correspond
          load.dismiss();
          const alert = await this.alertCtrl.create({
            header: 'Info',
            message: 'Vos informations de connexion sont incorrectes'+this.section1.value.numero+this.section1.value.password,
          });
          alert.present();
        }
      }
    } catch (error) {
      load.dismiss();
      const alert = await this.alertCtrl.create({
        header: 'Info',
        message: 'Erreur reessayer',
        buttons: [{ text: 'OK' }],
      });
      alert.present();
    }
  }
  // back
  Back() {
    this.Toback.back();
  }
}
