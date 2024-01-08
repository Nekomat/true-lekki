import { Component ,OnInit} from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { DataService } from './data.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor(private router: Router , private auth : Auth , private service : DataService , private fire : Firestore) { 
  }
 async ngOnInit() { 
  onAuthStateChanged(this.auth,async(user)=>{
    if(user){  
      this.router.navigateByUrl('/',{replaceUrl:true}) 
      SplashScreen.hide(); 
    }else{  
      const test = await getDoc(doc(this.fire,'APPINFO','WO3qaXwpoanK4N84qPF7')) 
      if(test.exists()){
        const hisData:any = test.data() 
        if(hisData.test){
          this.router.navigateByUrl('/',{replaceUrl:true}) 
          SplashScreen.hide();
        }else{
          this.router.navigateByUrl('/welcome1',{replaceUrl:true})
          SplashScreen.hide();
        }
      }
     
    }  
   })  
    Geolocation.getCurrentPosition({enableHighAccuracy:true}).then((value)=>{
      this.service.userLocation = value.coords
    })
    PushNotifications.requestPermissions().then((value)=>{
      if(value.receive=='granted'){ 
        PushNotifications.register()
      }
     })
  }


}

