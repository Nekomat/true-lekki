import { Component, OnInit } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes',
  templateUrl: './mes.page.html',
  styleUrls: ['./mes.page.scss'],
})
export class MesPage implements OnInit {
  constructor(
    private fire: Firestore,
    public service: DataService,
    private loadCtrl: LoadingController ,
    private router : Router
  ) {}
  CommandeDetail: any;
  ordonnance:any
  async ngOnInit() {
    const load = await this.loadCtrl.create({ message: 'Veuillez patienter' });
    load.present();
    const refCommande = await getDocs(
      query(
        collection(this.fire, 'COMMANDES'),
        where('userId', '==', this.service.userData.id)
      )
    );
    let take = [];
    refCommande.forEach((element) => {
      let commande: any = element.data();
      commande.date = new Date(commande.time.seconds * 1000).toLocaleDateString(
        'fr'
      );
      take.push(commande);
      this.CommandeDetail = take;
    });
    // prendre les ordonnances
  const refOrdon = await getDocs(
    query(
      collection(this.fire, 'ORDONNANCES'),
      where('userId', '==', this.service.userData.id)
    )
  );
  let Ordon = []
  refOrdon.forEach((element)=>{
   let o:any = element.data() 
   o.date = new Date(o.time.seconds*1000).toLocaleDateString('fr') 
   Ordon.push(o) 
   this.ordonnance = Ordon
  })
   
    load.dismiss();
  }
  // segment button 
  segmentValue = 'commande'
  segmentValueChange(event){
    this.segmentValue=event.detail.value
  }
// voir les details d'une commande traites 
 GotoDetail(data){ 
  this.service.typeTraiteCommande=this.segmentValue
   this.service.traiteCommande = data 
   this.router.navigateByUrl('/user-valid')
 }
  

}
