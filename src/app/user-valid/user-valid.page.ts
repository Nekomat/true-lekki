import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-valid',
  templateUrl: './user-valid.page.html',
  styleUrls: ['./user-valid.page.scss'],
})
export class UserValidPage implements OnInit {

  constructor(
    public service :DataService,
    private fire:Firestore,
    private http:HttpClient,
    private loadCtrl:LoadingController , 
    private router :Router ,
    private location : Location
  ) { }

  ngOnInit() {
  }

 async Accept(){
  const load = await this.loadCtrl.create({ message: 'Veuillez patienter' });
  load.present();
 
  // prendre le token du message
  const refToken = await getDoc(
    doc(this.fire, 'APPINFO', 'WO3qaXwpoanK4N84qPF7')
  ); 
  if(refToken.exists()){
    const tokenHisData :any = refToken.data() 
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenHisData.tokenSms}`,
      }),
    };
    if(this.service.typeTraiteCommande=='ordon'){
       // information de la pharmacie 
    let data = {
      outboundSMSMessageRequest: {
        address: `tel:+224${this.service.traiteCommande.pharContact}`,
        senderAddress: 'tel:+2240000',
        senderName: 'Lekki',
        outboundSMSTextMessage: {
          message: `Bonjour l'ordonnance N${this.service.traiteCommande.code} a ete accepter`,
        },
      },
    };
    this.http
    .post(
      'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
      data,
      httpOptions
    ).subscribe(()=>{
       // information admin general 
       let data = {
        outboundSMSMessageRequest: {
          address: `tel:+224${this.service.traiteCommande.pharContact}`,
          senderAddress: 'tel:+2240000',
          senderName: 'Lekki',
          outboundSMSTextMessage: {
            message: `Bonjour la commande N${this.service.traiteCommande.code} a ete accepter`,
          },
        },
      };
      this.http
            .post(
              'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
              data,
              httpOptions
            ).subscribe(()=>{
              updateDoc(doc(this.fire,'ORDONNANCES',this.service.traiteCommande.id),{
                statut:'Accepte'
              })
              load.dismiss() 
             this.router.navigateByUrl('/succes-order')
            },()=>{
              alert('Erreur Veuillez reessayer')
              load.dismiss()
            })

    },()=>{
      alert('Erreur Veuillez reessayer')
      load.dismiss()
    })

    }else{
    // information de la pharmacie 
    let data = {
      outboundSMSMessageRequest: {
        address: `tel:+224${this.service.traiteCommande.pharContact}`,
        senderAddress: 'tel:+2240000',
        senderName: 'Lekki',
        outboundSMSTextMessage: {
          message: `Bonjour la commande N${this.service.traiteCommande.code} a ete accepter`,
        },
      },
    };
    this.http
    .post(
      'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
      data,
      httpOptions
    ).subscribe(()=>{
      // information admin general 
      let data = {
        outboundSMSMessageRequest: {
          address: `tel:+224${tokenHisData.contact}`,
          senderAddress: 'tel:+2240000',
          senderName: 'Lekki',
          outboundSMSTextMessage: {
            message: `Bonjour la commande N${this.service.traiteCommande.code} a ete accepter`,
          },
        },
      };
      this.http
      .post(
        'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
        data,
        httpOptions
      ).subscribe(()=>{
        updateDoc(doc(this.fire,'COMMANDES',this.service.traiteCommande.id),{
          statut:'Accepte'
        })
        load.dismiss() 
       this.router.navigateByUrl('/succes-order')
      },()=>{
        alert('Erreur Veuillez reessayer')
        load.dismiss()
      })
    },()=>{
      alert('Erreur Veuillez reessayer')
      load.dismiss()
    })
    }
   
  } 
  
  } 
  Annule(){
    if(this.service.typeTraiteCommande=='ordon'){
      updateDoc(doc(this.fire,'ORDONNANCES',this.service.traiteCommande.id),{
        statut:'Annule'
      })
      this.router.navigateByUrl('/')
    }else{
      updateDoc(doc(this.fire,'COMMANDES',this.service.traiteCommande.id),{
        statut:'Annule'
      })
      this.router.navigateByUrl('/')
    }
   
  }
  // back 
  goBack(){
    this.location.back()
  }
}
