import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, Timestamp, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  constructor(
    public service: DataService,
    private fire: Firestore,
    private auth: Auth,
    private router: Router,
    private alertCtrl: AlertController ,
    private storage : Storage , 
    private loadCtrl:LoadingController
  ) {}

  ngOnInit() {}
  async SignOut() {
    const alert = await this.alertCtrl.create({
      header: 'Avertissement',
      message: 'Voulez-vous vous deconnecter?',
      buttons: [
        {
          text: 'Oui',
          handler: () => {
            signOut(this.auth).then(() => {
              this.router.navigateByUrl('/welcome1');
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
  // send paper 
  async sendPaper(){
    Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      promptLabelCancel: 'Annulé',
      promptLabelHeader: 'Prendre ou selectionner une photo',
      promptLabelPhoto: 'Choisir une photo',
      promptLabelPicture: 'Prendre une photo',
    }).then(async(photo)=>{
      const load = await this.loadCtrl.create({
        message: 'Veuillez pateinter',
      });
      load.present();
      let code =
            `${Math.floor(Math.random() * 10)}` +
            `${Math.floor(Math.random() * 10)}` +
            `${Math.floor(Math.random() * 10)}` +
            `${Math.floor(Math.random() * 10)}` +
            `${Math.floor(Math.random() * 10)}`;
      const refImg = ref(this.storage, `ordonnances/${code}`);
      uploadString(refImg, photo.dataUrl, 'data_url').then(async(snapshot)=>{
        const link = await getDownloadURL(snapshot.ref);
        const refdoc = doc(collection(this.fire,'ORDONNANCES'))
        setDoc(refdoc,{
          id:refdoc.id,
          userName:this.service.userData.name,
          numero:this.service.userData.numero ,
          link:link,
          time:Timestamp.now(),
          userId:this.service.userData.id,
          code:code,
          statut:'En cour de traitement'
        })
        load.dismiss()
      const alert = await this.alertCtrl.create({
        header:'Information',
        message:'Votre ordonnance a été envoyée avec succès à nos différentes pharmacies. Vous allez recevoir une réponse sous peu.',
        buttons:[{
          text:'Ok'
        }]
      })
      alert.present()
      })
    }).catch(async()=>{
      const alert = await this.alertCtrl.create({
        header:'Avertissement',
        message:'Photo non chargée.',
        buttons:[{
          text:'OK'
        }]
      })
      alert.present()
    })
    }
}
