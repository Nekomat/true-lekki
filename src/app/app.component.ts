import { Component ,OnInit} from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';
import { SplashScreen } from '@capacitor/splash-screen';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent  implements OnInit{
  constructor(private router: Router , private auth : Auth , private service : DataService) { 
  }
 async ngOnInit() { 
  onAuthStateChanged(this.auth,(user)=>{
    if(user){  
      this.router.navigateByUrl('/',{replaceUrl:true})
      SplashScreen.hide(); 
    }else{  
      this.router.navigateByUrl('/welcome1',{replaceUrl:true})
      SplashScreen.hide();
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

