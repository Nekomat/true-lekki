import { Component, OnInit,ViewChild } from '@angular/core';
import {LocalNotifications}  from '@capacitor/local-notifications'
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
@Component({
  selector: 'app-prise-medicament',
  templateUrl: './prise-medicament.page.html',
  styleUrls: ['./prise-medicament.page.scss'],
})
export class PriseMedicamentPage implements OnInit {
  @ViewChild('deleteModal') deleteModal : IonModal 
  @ViewChild('modalCreate') createModal : IonModal
  constructor(
  private alertCtrl:AlertController
  ) { }
  allRappel=[]
  ngOnInit() { 
    let take = JSON.parse(localStorage.getItem('rappel')) 
    if(take){
      this.allRappel = take
    }
  }
  rapellDetail={
    name:'',
    at:'',
    id:0,
    body:''
  }
  setRappe(){
    if(!this.rapellDetail.name || !this.rapellDetail.body || !this.rapellDetail.at){
      return
    }
    this.rapellDetail.id = new Date().getTime()
   const now = new Date();
    // Définissez l'heure à laquelle vous souhaitez déclencher la notification (par exemple, 14:30) 
   let atTime = this.rapellDetail.at.split(':') 
   let at1 = parseInt(atTime[0] ) 
   let at2 = parseInt(atTime[1]) 
   console.log(at1,at2)
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), at1, at2, 0, 0);
    LocalNotifications.schedule({
      notifications:[{
        id:this.rapellDetail.id,
        title:this.rapellDetail.name,
        body:this.rapellDetail.body,
        schedule:{ 
          every:'day',
          at:scheduledTime
        }
      }]
    }).then(async()=>{
    const alert = await this.alertCtrl.create({
      header:'Information',
      message:"Votre rappel a été ajouté. Il commence aujourd'hui selon l'heure que vous avez choisie.",
      buttons:[{text:'OK'}]
    })
    alert.present() 
    this.allRappel.push(this.rapellDetail)
    localStorage.setItem('rappel',JSON.stringify(this.allRappel)) 
    this.createModal.dismiss()
    }).catch((e)=>{
      alert("Veuillez choisir une heure supérieure à l'heure actuelle.")
    })
  }
  // delete rappel 
  delete(){ 
    this.allRappel = this.allRappel.filter(e=>e.id != this.id) 
    localStorage.setItem('rappel',JSON.stringify(this.allRappel))
   LocalNotifications.removeAllListeners() 
   this.deleteModal.dismiss()
  }
  // open delete modal 
  id=''
  openModal(id){
    this.id=id
    this.deleteModal.present()
  }
  // open create modal 
  OpenCreate(){
    this.createModal.present() 
  }
}
