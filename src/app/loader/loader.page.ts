import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { AlertController } from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
  constructor(
    private fire: Firestore,
    private auth: Auth,
    private router: Router,
    private alertCtrl: AlertController,
    private service: DataService
  ) {}
  loader = true;
  async ngOnInit() {
    // permission push notification
    PushNotifications.requestPermissions();
    // si permission accepter
    Geolocation.getCurrentPosition()
      .then((position) => {
        this.service.userLocation = position;
        console.log(position);
        const refDoc = doc(this.fire, 'APPINFO', 'DjhFwmiL3MK9p8jghUEd');
        getDoc(refDoc)
          .then((data) => {
            console.log('ok');
            onAuthStateChanged(this.auth, (user) => {
              if (user) {
                this.router.navigateByUrl('/', { replaceUrl: true });
              } else {
                this.router.navigateByUrl('/welcome1', { replaceUrl: true });
              }
            });
          })
          .catch(async () => {
            const alert = await this.alertCtrl.create({
              header: 'Info',
              message: 'Veuillez verifier votre internet',
              buttons: [{ text: 'OK' }],
            });
            alert.present();
            this.loader = false;
          });
      })
      .catch(async (e) => {
        this.loader = false;
        const alert = await this.alertCtrl.create({
          header: 'Info',
          message:
            'Vous devrez accepter la localisation ce qui nous permettra de vous présenter les pharmacies plus proches',
          buttons: [{ text: 'OK' }],
        });
        alert.present();
        console.log(e);
      });
  }
  // try again
  TryAgain() {
    this.loader = true;
    this.service.GetUserData();
    this.ngOnInit();
  }
}
