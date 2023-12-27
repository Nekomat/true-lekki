import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  PopoverController,
  ToastController,
} from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(
    public service: DataService,
    private formCtrl: FormBuilder,
    private fire: Firestore,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private auth: Auth,
    private router: Router,
    private popCtrl: PopoverController
  ) {}
  section: FormGroup = this.formCtrl.group({
    name: [this.service.userData.name, [Validators.required]],
    family: [this.service.userData.family, [Validators.required]],
    email: [this.service.userData.email, [Validators.email]],
    numero: [this.service.userData.numero, [Validators.required]],
  });
  ngOnInit() {
    if (this.service.userData.date) {
      this.date = new Date(this.service.userData.date);
    }
    if (this.service.userData.genre) {
      this.genre = this.genre;
    }
  }
  date = new Date();
  dateIsChosed = false;
  genre = '';
  ControleDate(event) {
    this.date = new Date(event.detail.value);
    this.service.userNaissance = this.date;
    this.popCtrl.dismiss();
    this.dateIsChosed = true;
  }
  async Update() {
    updateDoc(doc(this.fire, 'USERS', this.service.userData.id), {
      name: this.section.value.name,
      family: this.section.value.family,
    });
    if (this.dateIsChosed) {
      updateDoc(doc(this.fire, 'USERS', this.service.userData.id), {
        date: this.date.toLocaleString('fr'),
      });
    }
    if (this.genre) {
      updateDoc(doc(this.fire, 'USERS', this.service.userData.id), {
        genre: this.genre,
      });
    }
    this.service.GetUserData();
    const toast = await this.toastCtrl.create({
      message: 'Mise à jour effectuer',
      duration: 2000,
    });
    toast.present();
  }

  async Delete() {
    const alert = await this.alertCtrl.create({
      header: 'Avertissement',
      message: 'Voulez-vous supprimer votre compte ?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            signOut(this.auth).then(async () => {
              this.router.navigateByUrl('/slides');
              const toast = await this.toastCtrl.create({
                message: 'Votre compte à été supprimer',
                duration: 2000,
              });
              toast.present();
            });
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
