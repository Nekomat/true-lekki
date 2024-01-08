import { Component } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from '../data.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private fire: Firestore,
    public service: DataService,
    private loadCtrl: LoadingController,
    private router: Router
  ) {}
  allPharmacie: Array<any> = [];
  async ngOnInit() {
    // get all pharmacies
    const refPharmacie = await getDocs(collection(this.fire, 'PHARMACIES'));
    refPharmacie.forEach(async (element) => {
      let take: any = element.data();
      // calcul de distance entre l'utilisateur
      if (this.service.userLocation) { 
        let distance = await this.service.Getdistance(
          take.latitude,
          take.longitude,
          this.service.userLocation.latitude,
          this.service.userLocation.longitude
        );
        take.distance = distance.distance.toFixed();
        take.t = distance.hour;
      }
      // verifier si ouvert ou ferme
      if (take.CloseAndOpenHour) { 
        let today = new Date().getDay();
        let getHour = take.CloseAndOpenHour.find((e) => e.index == today);
        let pharOpenHour = getHour.open as string;
        pharOpenHour = pharOpenHour[0] + pharOpenHour[1];
        pharOpenHour = pharOpenHour[0] == '0' ? pharOpenHour[1] : pharOpenHour;
        let pharCloseHour = getHour.close as string;
        pharCloseHour = pharCloseHour[0] + pharCloseHour[0];
        pharCloseHour =
          pharCloseHour[0] == '0' ? pharCloseHour[1] : pharCloseHour; 
        let openHour = parseInt(pharOpenHour);
        let closeHour = parseInt(pharCloseHour);
        let nowDate = new Date();
        if (openHour <= nowDate.getHours() && nowDate.getHours() < closeHour) {
          take.isOpen = true;
        } else { 
          take.isOpen = false;
        }
      } else {
        take.isOpen = false;
      }
      this.allPharmacie.push(take);

      if(this.service.userLocation){
        this.allPharmacie.sort((a, b) => a.distance - b.distance);
      }
      
    });
    FirebaseAnalytics.setScreenName({
      screenName: "Pharmacie",
      nameOverride: "Page des Pharmacies",
    });
    
  }
  // go to phar detail
  GotoPhar(data) {
    this.service.pharmacie=data
    this.router.navigateByUrl('/pharmacie-detail')
  }
  // segment value change 
  segmentValue = 'Pharmacies'
 async segmentValueChange(event){
  this.segmentValue=event.detail.value
    if(event.detail.value=='Carte'){ 
      const load = await this.loadCtrl.create({
        message:'Veuillez patienter'
      })
      load.present()
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: [this.service.userLocation.longitude,this.service.userLocation.latitude], // starting position [lng, lat]
        zoom: 10, // starting zoom
        accessToken:environment.mapBoxkey,
        }); 
        
        map.on('load', async function () {
          map.resize();  
      });
      const refPharmacie = await getDocs(collection(this.fire, 'PHARMACIES')) 
      refPharmacie.forEach((element)=>{
        let take:any=element.data() 
        const marker = new mapboxgl.Marker({
          color: "#000000",
          draggable: false,
          })
        marker.setLngLat([take.longitude,take.latitude]).addTo(map)
      }) 
      load.dismiss()  
    }
  } 
}
