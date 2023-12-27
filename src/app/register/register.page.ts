import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  AlertController,
  LoadingController,
  PopoverController,
} from '@ionic/angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  constructor(
    private formCtrl: FormBuilder,
    private service: DataService,
    private router: Router,
    private http: HttpClient,
    private loadCtrl: LoadingController,
    private fire: Firestore,
    private alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private Toback: Location
  ) {}
  // controle de formulaire
  section1: FormGroup = this.formCtrl.group({
    prenom: ['', [Validators.required, Validators.minLength(4)]],
    numero: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(\+\d{3}\s?)?\(?6\d{2}\)?[\s-]*\d{2}[\s-]*\d{2}[\s-]*\d{2}$/
        ),
      ],
    ],
  });

  section2:FormGroup = this.formCtrl.group({
    password:['',[Validators.required , Validators.minLength(5)]],
  })

  regisiterStep={start:true , end:false} 

  next(){
    this.regisiterStep.start=false
    this.regisiterStep.end=true
  } 

  back(){
    this.regisiterStep.end=false
    this.regisiterStep.start=true
  }

  ngOnInit() {}
  
  // sent OTP
  async SendOTP() {
    try {
      let code =
        `${Math.floor(Math.random() * 10)}` +
        `${Math.floor(Math.random() * 10)}` +
        `${Math.floor(Math.random() * 10)}` +
        `${Math.floor(Math.random() * 10)}` 
        
      const load = await this.loadCtrl.create({
        message: 'Veuillez patienter',
      });
      load.present();
      const refToken = await getDoc(
        doc(this.fire, 'APPINFO', 'WO3qaXwpoanK4N84qPF7')
      );
      if (refToken.exists()) {
        const hisData: any = refToken.data();
        //request header
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${hisData.tokenSms}`,
          }),
        };
        //les data pour la requete
        let data = {
          outboundSMSMessageRequest: {
            address: `tel:+224${this.section1.value.numero}`,
            senderAddress: 'tel:+2240000',
            senderName: 'Lekki appli',
            outboundSMSTextMessage: {
              message: `Votre code de validation : ${code}`,
            },
          },
        };

        this.http
          .post(
            'https://api.orange.com/smsmessaging/v1/outbound/tel%3A%2B2240000/requests',
            data,
            httpOptions
          )
          .subscribe(
            () => {
              this.service.userInit ={section1:this.section1,section2:this.section2};
              this.service.otp = code;
              load.dismiss();
              this.router.navigateByUrl('/otp');
            },
            async () => {
              load.dismiss();
              const alert = await this.alertCtrl.create({
                header: 'Avertissement',
                message: 'Erreur Veuillez reessayer',
                buttons: [{ text: 'OK' }],
              });
              alert.present();
            }
          );
      }
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Avertissement',
        message: 'Erreur Veuillez reessayer',
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
