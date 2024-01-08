import { Component , OnInit , ViewChild} from '@angular/core';
import { Firestore, Timestamp, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DataService } from '../data.service';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 @ViewChild('produit') productModal : IonModal
  constructor(
    private fire : Firestore , 
    private storage : Storage , 
    private loadCtrl : LoadingController,
    public service : DataService , 
    private alertCtrl : AlertController 
  ) {}
  cate:Array<any>=[]
  product:Array<any> = []
 async ngOnInit(){ 
  try { 
    FirebaseAnalytics.setScreenName({
      screenName: "Acceuil",
      nameOverride: "Page Acceuil",
    });
    // prendre les produits 
    const refProduct = await getDocs(collection(this.fire,'PRODUCTS')) 
    refProduct.forEach((element)=>{ 
      let take :any = element.data()
      this.product.push(element.data())
    })
    this.allProduct = this.product
  } catch (error) {
     alert(error.message) 
  }
  }
  
  allProduct:Array<any>=[]
   

  // single product 
  singleData :any 
  openSingle(data){
   this.singleData=data 
   this.productModal.present()
  }
  word=''
  search(){
  if(this.word){
    this.product = this.allProduct.filter(e=>e.name.toLowerCase().includes(this.word.toLowerCase()))
  }else{
    this.product = this.allProduct
  }
  }
  // send ordonnances 
 async sendPaper(){
  Camera.getPhoto({
    quality: 90,
    resultType: CameraResultType.DataUrl,
    promptLabelCancel: 'Annuler',
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
        statut:'En cour traitement'
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
  ionViewDidEnter(){
    if(this.product[0]){
      this.product.forEach(element=>{
        this.service.panier.forEach(elementP=>{
          if(element.id == elementP.id){
            element=elementP
          }else{
            element.isPanier=false
          }
        })
      })
    }
  }
}
