import { Component , OnInit , ViewChild} from '@angular/core';
import { Firestore, Timestamp, collection, doc, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadString } from '@angular/fire/storage';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { DataService } from '../data.service';
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
    const refCate = await getDoc(doc(this.fire,'CATEGORIE','ZZJrAv46HHtHG48X7lVQ')) 
    if(refCate.exists()){
     let take :any = refCate.data() 
     this.cate = take.cate 
    }
    // prendre les produits 
    const refProduct = await getDocs(collection(this.fire,'PRODUCTS')) 
    refProduct.forEach((element)=>{ 
      let take :any = element.data() 
      this.service.AllProduct.push(take)
      take.btn = 'Ajouter'
      take.isPanier=false
      let i = this.product.findIndex(e=>e.cateName == take.cateName ) 
      if(i!=-1){
        this.product[i].product.push(take)
      }else{
        this.product.push({cateName:take.cateName , product:[take]})
      }
    })
    this.allProduct = this.product
  } catch (error) {
     alert(error.message)
  }
    
  }
  // changement de segment 
  segmentValue='tout'
  allProduct:Array<any>=[]
  segmentValueChange(event){
   if(event.detail.value=='tout'){
    this.product=this.allProduct
   }else{
    this.product = this.allProduct.filter(e=>e.cateName == event.detail.value)
   }
  } 

  // single product 
  singleData :any 
  openSingle(data){
   this.singleData=data 
   this.productModal.present()
  }
  // send ordonnances 
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
}
